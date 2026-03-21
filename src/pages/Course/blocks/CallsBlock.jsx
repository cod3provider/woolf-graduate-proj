import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import cl from "./CallsBlock.module.css";

const CallsBlock = ({ callsCode }) => {
  return (
    <section className={cl.callsSection}>
      <span className={cl.sectionBadge}>Examples</span>
      <h2 className={cl.sectionTitle}>Calls + what they print</h2>

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
          {callsCode}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default CallsBlock;