import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import cl from "./FindMistakeSection.module.css";

const FindMistakeSection = ({
  badge = "Practice",
  title = "Find the mistake",
  description = "Read the code and choose what is wrong in it.",
  tasks = [],
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});

  const handleSelect = (taskId, optionKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [taskId]: optionKey,
    }));
  };

  const handleCheck = (taskId) => {
    if (!selectedAnswers[taskId]) return;

    setCheckedAnswers((prev) => ({
      ...prev,
      [taskId]: true,
    }));
  };

  if (!tasks.length) return null;

  return (
    <div className={cl.quizBlock}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>
      <p className={cl.sectionText}>{description}</p>

      <div className={cl.tasksList}>
        {tasks.map((task, index) => {
          const selected = selectedAnswers[task.id];
          const checked = checkedAnswers[task.id];
          const correctAnswers = Array.isArray(task.correct)
            ? task.correct
            : [task.correct];
          const isCorrect = correctAnswers.includes(selected);

          return (
            <article key={task.id} className={cl.taskCard}>
              <div className={cl.taskHeader}>
                <span className={cl.taskNumber}>{index + 1}</span>
                <h3 className={cl.taskTitle}>
                  {task.title?.trim() || `Mistake #${index + 1}`}
                </h3>
              </div>

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
                {Object.entries(task.options).map(([key, text]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${cl.optionBtn} ${
                      selected === key ? cl.selectedOption : ""
                    } ${
                      checked && correctAnswers.includes(key)
                        ? cl.correctOption
                        : ""
                    } ${
                      checked &&
                      selected === key &&
                      !correctAnswers.includes(selected)
                        ? cl.wrongOption
                        : ""
                    }`}
                    onClick={() => handleSelect(task.id, key)}
                  >
                    <span className={cl.optionLetter}>{key}</span>
                    <span className={cl.optionText}>
                      {Array.isArray(text) ? text.join("\n") : text}
                    </span>
                  </button>
                ))}
              </div>

              <div className={cl.taskFooter}>
                <button
                  type="button"
                  className={cl.checkBtn}
                  onClick={() => handleCheck(task.id)}
                  disabled={!selected}
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
                      : `Not quite. Correct answer: ${correctAnswers.join(", ")}`}
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

export default FindMistakeSection;