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
    (config.options || []).filter(opt => opt.trim() !== '').forEach((opt, i) => {
      options[LETTERS[i]] = opt.split('\n').filter(l => l.trim() !== '');
    });
    const correctRaw = config.correct ?? [];
    const correct = Array.isArray(correctRaw)
      ? correctRaw.map(i => LETTERS[i])
      : [LETTERS[correctRaw]];
    return { ...rest, code: config.code, question: config.question, options, correct };
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
    // Support both old string format and new {text, pos} format
    const normalized = raw.map((l, i) => ({
      id: String(i + 1),
      text: typeof l === 'string' ? l : (l.text ?? ''),
      pos: typeof l === 'string' ? (i + 1) : (l.pos ?? i + 1),
    }));
    // correctOrder = admin-entered sequence (admin writes lines in the correct code order)
    const correctOrder = normalized.map(l => l.id);
    // Display lines sorted by pos — this scrambles them from the correct order
    const lines = [...normalized].sort((a, b) => a.pos - b.pos);
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
