import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import cl from "./RealCodeBlock.module.css";

const RealCodeBlock = ({
  badge = "In practice",
  title = "Decorators in real code",
  introParagraphs = [
    "Decorators are useful because they let you add reusable behavior around a function.",
    "Instead of rewriting the same code before and after many functions, you write it once in a decorator and apply it wherever needed.",
    "They show up all the time in real code:",
  ],
  listItems = [
    "logging (print or save information about function calls)",
    "timing (measure how long something takes)",
    "access checks (allow only certain users)",
    "validation (check inputs before running code)",
    "caching (save results of expensive functions)",
    "web frameworks, where routes and permissions are often decorators",
  ],
  miniTitle = "Real example: timing a function",
  exampleParagraphs = [
    "You want to know how long a function takes.",
    "Instead of editing every function manually, you can write one decorator and reuse it.",
  ],
  code = `import time

def timing(func):
    def wrapper():
        start = time.time()
        func()
        end = time.time()
        print("Took", end - start, "seconds")
    return wrapper`,
  outroParagraphs = [
    "Now you can decorate any function you want to measure.",
  ],
  calloutTitle = "What's the decorator here?",
  calloutParagraphs = [
    "timing is the decorator.",
    "It takes the original function, wraps it inside wrapper, adds timing logic, and returns the wrapped version.",
    "So the original function still does its own job — the decorator just adds an extra layer around it.",
  ],
}) => {
  return (
    <section className={cl.realCodeSection}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>

      <div className={cl.realCodeText}>
        {introParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <ul className={cl.realCodeList}>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className={cl.miniTitle}>{miniTitle}</h3>

      <div className={cl.realCodeText}>
        {exampleParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className={cl.lightCodeSection}>
        <SyntaxHighlighter
          language="python"
          style={oneLight}
          PreTag="div"
          wrapLongLines={true}
          showLineNumbers={false}
          customStyle={{
            margin: 0,
            padding: "22px 24px",
            background: "transparent",
            fontSize: "15px",
            lineHeight: "1.85",
            whiteSpace: "pre-wrap",
            overflowX: "auto",
            borderRadius: "24px",
          }}
          codeTagProps={{
            style: {
              fontFamily: 'Consolas, "Courier New", monospace',
              whiteSpace: "pre-wrap",
              display: "block",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <div className={cl.realCodeText}>
        {outroParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className={cl.calloutCard}>
        <h3 className={cl.calloutTitle}>{calloutTitle}</h3>

        {calloutParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default RealCodeBlock;