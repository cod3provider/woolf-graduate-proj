const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Transforms a task from the API/admin format (config nested object)
 * to the flat format expected by the practice block components.
 * Tasks already in the old flat format are returned as-is.
 */
export function transformTask(task) {
  if (!task.config) return task; // already in old flat format

  const { config, ...rest } = task;

  if (task.task_type === 'multiple_choice') {
    const options = {};
    (config.options || []).forEach((opt, i) => {
      options[LETTERS[i]] = opt.split('\n').filter(l => l.trim() !== '');
    });
    const correct = typeof config.correct === 'number'
      ? LETTERS[config.correct]
      : config.correct;
    return { ...rest, question: config.question, options, correct };
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
    const lines = (config.lines || []).map((text, i) => ({ id: String(i + 1), text }));
    const correctOrder = lines.map(l => l.id);
    return { ...rest, lines, correctOrder };
  }

  return { ...rest, ...config };
}

export function buildPracticeProps(tasks = []) {
  return {
    codingTasksProps:     { tasks: tasks.filter(t => t.task_type === 'code_check').map(transformTask) },
    predictOutputProps:   { tasks: tasks.filter(t => t.task_type === 'multiple_choice').map(transformTask) },
    reorderLinesProps:    { tasks: tasks.filter(t => t.task_type === 'reorder_lines').map(transformTask) },
    fillMissingLineProps: { tasks: [] },
    findMistakeProps:     { tasks: [] },
  };
}
