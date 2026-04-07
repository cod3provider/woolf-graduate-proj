import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import cl from "./PredictOutputSection.module.css";

const PredictOutputSection = ({
  badge = "Practice",
  title = "Predict the output",
  description = "Read the code and choose what will be printed.",
  tasks = [],
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});

  const handleSelect = (taskId, optionKey) => {
    setSelectedAnswers((prev) => {
      const current = prev[taskId] || new Set();
      const next = new Set(current);
      next.has(optionKey) ? next.delete(optionKey) : next.add(optionKey);
      return { ...prev, [taskId]: next };
    });
  };

  const handleCheck = (taskId) => {
    if (!selectedAnswers[taskId]?.size) return;

    setCheckedAnswers((prev) => ({
      ...prev,
      [taskId]: true,
    }));
  };

  if (!tasks.length) return null;

  return (
    <div>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>
      <p className={cl.sectionText}>{description}</p>

      <div className={cl.tasksList}>
        {tasks.map((task, taskIndex) => {
          const selected = selectedAnswers[task.id] || new Set();
          const checked = checkedAnswers[task.id];
          const correctArr = Array.isArray(task.correct) ? task.correct : [task.correct];
          const isCorrect =
            correctArr.length === selected.size &&
            correctArr.every(k => selected.has(k));
          const displayNum = taskIndex + 1;

          return (
            <article key={task.id} className={cl.taskCard}>
              <div className={cl.taskHeader}>
                <span className={cl.taskNumber}>{displayNum}</span>
                <h3 className={cl.taskTitle}>{task.title || `Predict #${displayNum}`}</h3>
              </div>
              {task.description && <p className={cl.taskDescription}>{task.description}</p>}

              <div className={cl.codeWrap}>
                <SyntaxHighlighter
                  language="python"
                  style={oneLight}
                  PreTag="div"
                  wrapLongLines={true}
                  showLineNumbers={false}
                  customStyle={{
                    margin: 0,
                    padding: "18px 20px",
                    background: "transparent",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap",
                    overflowX: "auto",
                    borderRadius: "18px",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'Consolas, "Courier New", monospace',
                      whiteSpace: "pre-wrap",
                      display: "block",
                    },
                  }}
                >
                  {task.code}
                </SyntaxHighlighter>
              </div>

              <p className={cl.question}>{task.question}</p>

              <div className={cl.optionsList}>
                {Object.entries(task.options).map(([key, lines]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${cl.optionBtn} ${
                      selected.has(key) ? cl.selectedOption : ""
                    } ${
                      checked && correctArr.includes(key) ? cl.correctOption : ""
                    } ${
                      checked &&
                      selected.has(key) &&
                      !correctArr.includes(key)
                        ? cl.wrongOption
                        : ""
                    }`}
                    onClick={() => handleSelect(task.id, key)}
                  >
                    <span className={cl.optionLetter}>{key}</span>

                    <span className={cl.optionText}>
                      {lines.map((line, index) => (
                        <span key={index} className={cl.optionLine}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </button>
                ))}
              </div>

              <div className={cl.taskFooter}>
                <button
                  type="button"
                  className={cl.checkBtn}
                  onClick={() => handleCheck(task.id)}
                  disabled={!selected.size}
                >
                  Check answer
                </button>

                {checked && (
                  <p
                    className={`${cl.feedback} ${
                      isCorrect ? cl.feedbackCorrect : cl.feedbackWrong
                    }`}
                  >
                    {isCorrect
                      ? "Correct!"
                      : `Not quite. Correct answer: ${correctArr.join(' or ')}`}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default PredictOutputSection;