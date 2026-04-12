import { FaPlus, FaTrash } from 'react-icons/fa';

import cl from '../AdminDashboard.module.css';

const TASK_TYPES = [
  { value: "code_check", label: "Code Check" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "reorder_lines", label: "Reorder Lines" },
];

const MULTIPLE_CHOICE_VARIANTS = [
  { value: "predict_output", label: "Predict the Output" },
  { value: "fill_missing_line", label: "Fill in the Missing Line" },
  { value: "find_mistake", label: "Find the Mistake" },
];

const defaultConfig = {
  code_check: { starter_code: "", solution: "", expected_output: "" },
  multiple_choice: {
    variant: "predict_output",
    code: "",
    question: "",
    options: ["", ""],
    correct: [],
  },
  reorder_lines: { lines: [{ text: "", pos: 1 }] },
};

const getMultipleChoiceVariant = (task) => {
  return task?.config?.variant || "predict_output";
};

const TaskEditor = ({ tasks, onChange }) => {
  const addTask = () => {
    const type = "code_check";

    onChange([
      ...tasks,
      {
        id: Date.now(),
        task_type: type,
        title: "",
        description: "",
        order_index: tasks.length,
        config: { ...defaultConfig[type] },
      },
    ]);
  };

  const updateTask = (idx, field, value) => {
    const updated = [...tasks];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const updateConfig = (idx, field, value) => {
    const updated = [...tasks];
    updated[idx] = {
      ...updated[idx],
      config: { ...updated[idx].config, [field]: value },
    };
    onChange(updated);
  };

  const changeType = (idx, newType) => {
    const updated = [...tasks];
    updated[idx] = {
      ...updated[idx],
      task_type: newType,
      config: { ...defaultConfig[newType] },
    };
    onChange(updated);
  };

  return (
    <div className={cl.taskManager}>
      {tasks.map((task, idx) => (
        <div key={task.id} className={cl.taskItem}>
          <div className={cl.taskHeader}>
            <input
              value={task.title}
              onChange={e => updateTask(idx, 'title', e.target.value)}
              placeholder="Task title (shown as subtitle in preview)"
            />

            <select
              value={task.task_type}
              onChange={e => changeType(idx, e.target.value)}
            >
              {TASK_TYPES.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => onChange(tasks.filter((_, i) => i !== idx))}
              className={cl.deleteBtn}
            >
              <FaTrash />
            </button>
          </div>

          <textarea
            placeholder="Description (shown below title)"
            value={task.description}
            onChange={e => updateTask(idx, 'description', e.target.value)}
          />

          {task.task_type === "code_check" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <textarea
                className={`${cl.codeArea} ${cl.codeAreaSmall}`}
                placeholder="Starter code (shown to student)"
                rows={6}
                value={task.config.starter_code}
                onChange={e => updateConfig(idx, 'starter_code', e.target.value)}
              />
              <textarea
                className={`${cl.codeArea} ${cl.codeAreaSmall}`}
                placeholder="Solution (full working code)"
                rows={6}
                value={task.config.solution}
                onChange={e => updateConfig(idx, 'solution', e.target.value)}
              />
              <textarea
                placeholder="Expected output (one line per print)"
                rows={3}
                value={task.config.expected_output}
                onChange={e => updateConfig(idx, 'expected_output', e.target.value)}
              />
            </div>
          )}

          {task.task_type === "multiple_choice" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select
                value={getMultipleChoiceVariant(task)}
                onChange={e => updateConfig(idx, 'variant', e.target.value)}
              >
                {MULTIPLE_CHOICE_VARIANTS.map(variant => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </select>

              <textarea
                className={cl.codeArea}
                placeholder="Python code snippet..."
                rows={5}
                value={task.config.code}
                onChange={e => updateConfig(idx, 'code', e.target.value)}
              />

              <input
                placeholder="Question (e.g. What is printed?)"
                value={task.config.question}
                onChange={e => updateConfig(idx, 'question', e.target.value)}
              />

              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0' }}>
                Options — check to mark correct (multiple allowed). Use newlines for multi-line output.
              </p>

              {task.config.options.map((opt, oi) => (
                <div
                  key={oi}
                  style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}
                >
                  <input
                    type="checkbox"
                    checked={(Array.isArray(task.config.correct) ? task.config.correct : []).includes(oi)}
                    onChange={e => {
                      const prev = Array.isArray(task.config.correct) ? task.config.correct : [];
                      const next = e.target.checked
                        ? [...prev, oi]
                        : prev.filter(i => i !== oi);

                      updateConfig(idx, 'correct', next);
                    }}
                    title="Mark as correct"
                    style={{ marginTop: '10px', flexShrink: 0, width: 'auto' }}
                  />

                  <textarea
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    rows={2}
                    style={{ flex: 1, minWidth: 0, width: 0 }}
                    onChange={e => {
                      const options = [...task.config.options];
                      options[oi] = e.target.value;
                      updateConfig(idx, 'options', options);
                    }}
                  />

                  <button
                    className={cl.deleteBtn}
                    style={{ marginTop: '6px', flexShrink: 0 }}
                    onClick={() => {
                      const options = task.config.options.filter((_, i) => i !== oi);
                      const correct = (Array.isArray(task.config.correct)
                        ? task.config.correct
                        : []
                      )
                        .filter(i => i !== oi)
                        .map(i => (i > oi ? i - 1 : i));

                      const updated = [...tasks];
                      updated[idx] = {
                        ...updated[idx],
                        config: {
                          ...updated[idx].config,
                          options,
                          correct,
                        },
                      };
                      onChange(updated);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                className={cl.addTaskBtn}
                onClick={() =>
                  updateConfig(idx, 'options', [...task.config.options, ""])
                }
              >
                <FaPlus /> Add option
              </button>
            </div>
          )}

          {task.task_type === "reorder_lines" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0' }}>
                Enter each line of code. Set its correct position number (1 = first line in the solution).
              </p>

              {task.config.lines.map((line, li) => (
                <div
                  key={li}
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <input
                    type="number"
                    min={1}
                    value={line.pos ?? li + 1}
                    style={{ width: '50px', flexShrink: 0 }}
                    onChange={e => {
                      const lines = [...task.config.lines];
                      lines[li] = { ...lines[li], pos: Number(e.target.value) };
                      updateConfig(idx, 'lines', lines);
                    }}
                  />

                  <input
                    placeholder={`Code line ${li + 1}`}
                    value={line.text ?? line}
                    style={{ flex: 1, minWidth: 0, width: 0 }}
                    onChange={e => {
                      const lines = [...task.config.lines];
                      lines[li] = { ...lines[li], text: e.target.value };
                      updateConfig(idx, 'lines', lines);
                    }}
                  />

                  <button
                    className={cl.deleteBtn}
                    onClick={() =>
                      updateConfig(
                        idx,
                        'lines',
                        task.config.lines.filter((_, i) => i !== li)
                      )
                    }
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                className={cl.addTaskBtn}
                onClick={() =>
                  updateConfig(idx, 'lines', [
                    ...task.config.lines,
                    { text: "", pos: task.config.lines.length + 1 },
                  ])
                }
              >
                <FaPlus /> Add line
              </button>
            </div>
          )}
        </div>
      ))}

      <button onClick={addTask} className={cl.addTaskBtn}>
        <FaPlus /> Add task
      </button>
    </div>
  );
};

export default TaskEditor;