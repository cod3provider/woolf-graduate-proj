import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import cl from "./CodeExampleBlock.module.css";

const CodeExampleBlock = ({ burgerCode }) => {
  return (
    <section className={cl.codeSection}>
      <div className={cl.codeTop}>
        <div className={cl.codeDots}>
          <span className={cl.dot}></span>
          <span className={cl.dot}></span>
          <span className={cl.dot}></span>
        </div>
        <span className={cl.codeLabel}>Python example</span>
      </div>

      <div className={cl.syntaxWrap}>
        <SyntaxHighlighter
          language="python"
          style={oneDark}
          PreTag="div"
          wrapLongLines={true}
          showLineNumbers={false}
          customStyle={{
            margin: 0,
            padding: "24px 28px",
            background: "transparent",
            fontSize: "15px",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
            wordBreak: "normal",
            overflowWrap: "normal",
            overflowX: "auto",
            borderRadius: "0 0 28px 28px",
          }}
          codeTagProps={{
            style: {
              fontFamily: 'Consolas, "Courier New", monospace',
              whiteSpace: "pre-wrap",
              display: "block",
            },
          }}
        >
          {burgerCode}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default CodeExampleBlock;