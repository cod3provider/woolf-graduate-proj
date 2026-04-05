import { FaPlus, FaTrash } from 'react-icons/fa';

import cl from '../AdminDashboard.module.css';

const TASK_TYPES = [
  { value: "code_check", label: "Code Check" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "reorder_lines", label: "Reorder Lines" },
];

const defaultConfig = {
  code_check: { starter_code: "", solution: "", expected_output: "" },
  multiple_choice: { question: "", options: ["", ""], correct: 0 },
  reorder_lines: { lines: [""] },
};

const TaskEditor = ({ tasks, onChange }) => {
  const addTask = () => {
    const type = "code_check";
    onChange([...tasks, {
      id: Date.now(),
      task_type: type,
      title: "",
      description: "",
      order_index: tasks.length,
      config: { ...defaultConfig[type] },
    }]);
  };

  const updateTask = (idx, field, value) => {
    const updated = [...tasks];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const updateConfig = (idx, field, value) => {
    const updated = [...tasks];
    updated[idx] = { ...updated[idx], config: { ...updated[idx].config, [field]: value } };
    onChange(updated);
  };

  const changeType = (idx, newType) => {
    const updated = [...tasks];
    updated[idx] = { ...updated[idx], task_type: newType, config: { ...defaultConfig[newType] } };
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
              placeholder="Task title"
            />
            <select
              value={task.task_type}
              onChange={e => changeType(idx, e.target.value)}
            >
              {TASK_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button onClick={() => onChange(tasks.filter((_, i) => i !== idx))} className={cl.deleteBtn}>
              <FaTrash />
            </button>
          </div>

          <textarea
            placeholder="Description..."
            value={task.description}
            onChange={e => updateTask(idx, 'description', e.target.value)}
          />

          {task.task_type === "code_check" && (
            <div className={cl.taskGrid}>
              <textarea
                className={cl.codeAreaSmall}
                placeholder="Starter code..."
                value={task.config.starter_code}
                onChange={e => updateConfig(idx, 'starter_code', e.target.value)}
              />
              <textarea
                className={cl.codeAreaSmall}
                placeholder="Solution..."
                value={task.config.solution}
                onChange={e => updateConfig(idx, 'solution', e.target.value)}
              />
              <input
                placeholder="Expected output"
                value={task.config.expected_output}
                onChange={e => updateConfig(idx, 'expected_output', e.target.value)}
              />
            </div>
          )}

          {task.task_type === "multiple_choice" && (
            <div className={cl.taskGrid}>
              <input
                placeholder="Question"
                value={task.config.question}
                onChange={e => updateConfig(idx, 'question', e.target.value)}
              />
              {task.config.options.map((opt, oi) => (
                <div key={oi} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <input
                    type="radio"
                    name={`correct-${idx}`}
                    checked={task.config.correct === oi}
                    onChange={() => updateConfig(idx, 'correct', oi)}
                    title="Mark as correct"
                    style={{ marginTop: '8px' }}
                  />
                  <textarea
                    placeholder={`Option ${oi + 1} (one output line per line)`}
                    value={opt}
                    rows={2}
                    onChange={e => {
                      const opts = [...task.config.options];
                      opts[oi] = e.target.value;
                      updateConfig(idx, 'options', opts);
                    }}
                  />
                  <button
                    className={cl.deleteBtn}
                    onClick={() => {
                      const opts = task.config.options.filter((_, i) => i !== oi);
                      const correct = task.config.correct >= opts.length ? 0 : task.config.correct;
                      const updated = [...tasks];
                      updated[idx] = { ...updated[idx], config: { ...updated[idx].config, options: opts, correct } };
                      onChange(updated);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                className={cl.addTaskBtn}
                onClick={() => updateConfig(idx, 'options', [...task.config.options, ""])}
              >
                <FaPlus /> Add option
              </button>
            </div>
          )}

          {task.task_type === "reorder_lines" && (
            <div className={cl.taskGrid}>
              {task.config.lines.map((line, li) => (
                <div key={li} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    placeholder={`Line ${li + 1}`}
                    value={line}
                    onChange={e => {
                      const lines = [...task.config.lines];
                      lines[li] = e.target.value;
                      updateConfig(idx, 'lines', lines);
                    }}
                  />
                  <button
                    className={cl.deleteBtn}
                    onClick={() => updateConfig(idx, 'lines', task.config.lines.filter((_, i) => i !== li))}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                className={cl.addTaskBtn}
                onClick={() => updateConfig(idx, 'lines', [...task.config.lines, ""])}
              >
                <FaPlus /> Add line
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={addTask} className={cl.addTaskBtn}><FaPlus /> Add task</button>
    </div>
  );
};

export default TaskEditor;
