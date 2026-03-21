import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { isOutputMatch, runPythonTask } from "../../../utils/pyodideRunner";
import PythonEditor from "./PythonEditor";
import cl from "./CodingTasksSection.module.css";

const createInitialCodeState = (tasks) =>
  Object.fromEntries(tasks.map((task) => [task.id, task.starterCode]));

const createInitialRunState = (tasks) =>
  Object.fromEntries(
    tasks.map((task) => [
      task.id,
      {
        status: "idle",
        output: "",
        stderr: "",
        error: "",
        passed: null,
      },
    ])
  );

const CodingTasksSection = ({
  badge = "Practice",
  title = "Coding tasks",
  description = "",
  tasks = [],
}) => {
  const [codeByTask, setCodeByTask] = useState(() => createInitialCodeState(tasks));
  const [openSolution, setOpenSolution] = useState({});
  const [runState, setRunState] = useState(() => createInitialRunState(tasks));

  useEffect(() => {
    setCodeByTask(createInitialCodeState(tasks));
    setOpenSolution({});
    setRunState(createInitialRunState(tasks));
  }, [tasks]);

  const handleCodeChange = (taskId, value) => {
    setCodeByTask((prev) => ({
      ...prev,
      [taskId]: value,
    }));

    setRunState((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        status: "idle",
        passed: null,
        error: "",
      },
    }));
  };

  const handleReset = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    setCodeByTask((prev) => ({
      ...prev,
      [taskId]: task.starterCode,
    }));

    setRunState((prev) => ({
      ...prev,
      [taskId]: {
        status: "idle",
        output: "",
        stderr: "",
        error: "",
        passed: null,
      },
    }));
  };

  const handleToggleSolution = (taskId) => {
    setOpenSolution((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleRun = async (task) => {
    setRunState((prev) => ({
      ...prev,
      [task.id]: {
        ...prev[task.id],
        status: "running",
        output: "",
        stderr: "",
        error: "",
        passed: null,
      },
    }));

    const result = await runPythonTask({
      userCode: codeByTask[task.id],
      filename: `coding_task_${task.id}.py`,
    });

    const passed =
      result.ok && isOutputMatch(result.output, task.expectedOutput);

    setRunState((prev) => ({
      ...prev,
      [task.id]: {
        status: "done",
        output: result.output,
        stderr: result.stderr,
        error: result.error,
        passed,
      },
    }));
  };

  if (!tasks.length) return null;

  return (
    <div className={cl.quizBlock}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>
      {description && <p className={cl.sectionText}>{description}</p>}

      <div className={cl.tasksList}>
        {tasks.map((task) => {
          const state = runState[task.id];

          return (
            <article key={task.id} className={cl.taskCard}>
              <div className={cl.taskHeader}>
                <span className={cl.taskNumber}>{task.id}</span>
                <h3 className={cl.taskTitle}>{task.title}</h3>
              </div>

              <p className={cl.taskDescription}>{task.description}</p>

              <div className={cl.editorBlock}>
                <div className={cl.editorTop}>
                  <span className={cl.editorLabel}>Write your code</span>
                </div>

                <PythonEditor
                  value={codeByTask[task.id]}
                  onChange={(value) => handleCodeChange(task.id, value)}
                  height="360px"
                />
              </div>

              <div className={cl.taskFooter}>
                <button
                  type="button"
                  className={cl.resetBtn}
                  onClick={() => handleReset(task.id)}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className={cl.runBtn}
                  onClick={() => handleRun(task)}
                  disabled={state.status === "running"}
                >
                  {state.status === "running" ? "Running..." : "Run code"}
                </button>

                <button
                  type="button"
                  className={cl.solutionBtn}
                  onClick={() => handleToggleSolution(task.id)}
                >
                  {openSolution[task.id] ? "Hide right code" : "Show right code"}
                </button>
              </div>

              {(state.output ||
                state.error ||
                state.stderr ||
                state.status === "running") && (
                <div className={cl.outputWrap}>
                  <div className={cl.outputTop}>
                    <span className={cl.outputTitle}>Result</span>

                    {state.status === "running" && (
                      <span className={`${cl.resultBadge} ${cl.resultNeutral}`}>
                        Running
                      </span>
                    )}

                    {state.status === "done" && state.error && (
                      <span className={`${cl.resultBadge} ${cl.resultError}`}>
                        Runtime error
                      </span>
                    )}

                    {state.status === "done" &&
                      !state.error &&
                      state.passed === true && (
                        <span className={`${cl.resultBadge} ${cl.resultPass}`}>
                          Matches expected output
                        </span>
                      )}

                    {state.status === "done" &&
                      !state.error &&
                      state.passed === false && (
                        <span className={`${cl.resultBadge} ${cl.resultFail}`}>
                          Output is different
                        </span>
                      )}
                  </div>

                  {state.output && (
                    <div className={cl.outputBlock}>
                      <div className={cl.outputLabel}>Output</div>
                      <pre className={cl.outputCode}>{state.output}</pre>
                    </div>
                  )}

                  {state.stderr && (
                    <div className={cl.outputBlock}>
                      <div className={cl.outputLabel}>stderr</div>
                      <pre className={cl.outputCode}>{state.stderr}</pre>
                    </div>
                  )}

                  {state.error && (
                    <div className={`${cl.outputBlock} ${cl.errorBlock}`}>
                      <div className={cl.outputLabel}>Error</div>
                      <pre className={cl.outputCode}>{state.error}</pre>
                    </div>
                  )}
                </div>
              )}

              {openSolution[task.id] && (
                <div className={cl.solutionBlock}>
                  <div className={cl.solutionTop}>Right code</div>

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
                    {task.solution}
                  </SyntaxHighlighter>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CodingTasksSection;