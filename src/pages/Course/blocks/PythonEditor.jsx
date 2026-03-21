import Editor from "@monaco-editor/react";
import cl from "./PythonEditor.module.css";

const PythonEditor = ({ value, onChange, height = "260px" }) => {
  return (
    <div className={cl.editorShell}>
      <Editor
        height={height}
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 4,
          insertSpaces: true,
          detectIndentation: false,
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
          padding: { top: 14, bottom: 14 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
        }}
      />
    </div>
  );
};

export default PythonEditor;