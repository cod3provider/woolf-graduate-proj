import { FaPlus, FaTrash } from 'react-icons/fa';

import cl from '../AdminDashboard.module.css';

const TaskEditor = ({ tasks, onChange }) => {
  const addTask = () => {
    onChange([...tasks, {
      id: Date.now(),
      task_type: "code_check",
      title: "Новая задача",
      description: "",
      starterCode: "",
      solution: ""
    }]);
  };

  const updateTask = (idx, field, value) => {
    const newTasks = [...tasks];
    newTasks[idx] = { ...newTasks[idx], [field]: value };
    onChange(newTasks);
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
            <button onClick={() => onChange(tasks.filter((_, i) => i !== idx))} className={cl.deleteBtn}>
              <FaTrash />
            </button>
          </div>
          <textarea
            placeholder="Description (what needs to do)..."
            value={task.description}
            onChange={e => updateTask(idx, 'description', e.target.value)}
          />
          <div className={cl.taskGrid}>
            <textarea
              className={cl.codeAreaSmall}
              placeholder="Initial code..."
              value={task.starterCode}
              onChange={e => updateTask(idx, 'starterCode', e.target.value)}
            />
            <textarea
              className={cl.codeAreaSmall}
              placeholder="Solution..."
              value={task.solution}
              onChange={e => updateTask(idx, 'solution', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={addTask} className={cl.addTaskBtn}><FaPlus /> Add task</button>
    </div>
  );
};

export default TaskEditor;