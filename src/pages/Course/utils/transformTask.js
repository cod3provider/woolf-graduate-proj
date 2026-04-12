const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const MULTIPLE_CHOICE_VARIANTS = {
  predict_output: 'predict_output',
  fill_missing_line: 'fill_missing_line',
  find_mistake: 'find_mistake',
};

function getMultipleChoiceVariant(task) {
  const explicitVariant = task.config?.variant || task.variant;
  if (explicitVariant) return explicitVariant;

  // Fallback for old saved tasks without variant
  const text = `${task.title || ''} ${task.description || ''} ${task.config?.question || ''}`.toLowerCase();

  if (text.includes('fill in the missing line') || text.includes('missing line')) {
    return MULTIPLE_CHOICE_VARIANTS.fill_missing_line;
  }

  if (text.includes('find the mistake') || text.includes('mistake')) {
    return MULTIPLE_CHOICE_VARIANTS.find_mistake;
  }

  return MULTIPLE_CHOICE_VARIANTS.predict_output;
}

/**
 * Transforms a task from the API/admin format (config nested object)
 * to the flat format expected by the practice block components.
 * Tasks already in the old flat format are returned as-is.
 */
export function transformTask(task) {
  if (!task.config) {
    return {
      ...task,
      variant:
        task.task_type === 'multiple_choice'
          ? (task.variant || MULTIPLE_CHOICE_VARIANTS.predict_output)
          : task.variant,
    };
  }

  const { config, ...rest } = task;

  if (task.task_type === 'multiple_choice') {
    const options = {};

    (config.options || [])
      .filter(opt => opt.trim() !== '')
      .forEach((opt, i) => {
        options[LETTERS[i]] = opt
          .split('\n')
          .filter(line => line.trim() !== '');
      });

    const correctRaw = config.correct ?? [];
    const correct = Array.isArray(correctRaw)
      ? correctRaw.map(i => LETTERS[i])
      : [LETTERS[correctRaw]];

    return {
      ...rest,
      code: config.code,
      question: config.question,
      options,
      correct,
      variant: getMultipleChoiceVariant(task),
    };
  }

  if (task.task_type === 'code_check') {
    return {
      ...rest,
      starterCode: config.starter_code,
      solution: config.solution,
      expectedOutput: config.expected_output,
    };
  }

  if (task.task_type === 'reorder_lines') {
    const raw = config.lines || [];

    const normalized = raw.map((line, i) => ({
      id: String(i + 1),
      text: typeof line === 'string' ? line : (line.text ?? ''),
      pos: typeof line === 'string' ? (i + 1) : (line.pos ?? i + 1),
    }));

    const correctOrder = normalized.map(line => line.id);
    const lines = [...normalized].sort((a, b) => a.pos - b.pos);

    return {
      ...rest,
      lines,
      correctOrder,
    };
  }

  return { ...rest, ...config };
}

export function buildPracticeProps(tasks = []) {
  const transformedTasks = tasks.map(transformTask);

  const codeCheckTasks = transformedTasks.filter(t => t.task_type === 'code_check');
  const reorderLinesTasks = transformedTasks.filter(t => t.task_type === 'reorder_lines');
  const multipleChoiceTasks = transformedTasks.filter(t => t.task_type === 'multiple_choice');

  return {
    codingTasksProps: {
      tasks: codeCheckTasks,
    },

    predictOutputProps: {
      tasks: multipleChoiceTasks.filter(
        t => t.variant === MULTIPLE_CHOICE_VARIANTS.predict_output
      ),
    },

    fillMissingLineProps: {
      tasks: multipleChoiceTasks.filter(
        t => t.variant === MULTIPLE_CHOICE_VARIANTS.fill_missing_line
      ),
    },

    findMistakeProps: {
      tasks: multipleChoiceTasks.filter(
        t => t.variant === MULTIPLE_CHOICE_VARIANTS.find_mistake
      ),
    },

    reorderLinesProps: {
      tasks: reorderLinesTasks,
    },
  };
}