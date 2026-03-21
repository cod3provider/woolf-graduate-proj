const PYODIDE_VERSION = "0.29.3";
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_SCRIPT_URL = `${PYODIDE_BASE_URL}pyodide.js`;

let scriptPromise = null;
let pyodidePromise = null;

function loadScript(src) {
  if (globalThis.loadPyodide) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-pyodide="true"]');

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Pyodide script.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.pyodide = "true";

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Pyodide script from CDN."));

    document.body.appendChild(script);
  });

  return scriptPromise;
}

export async function getPyodide() {
  if (pyodidePromise) {
    return pyodidePromise;
  }

  await loadScript(PYODIDE_SCRIPT_URL);

  pyodidePromise = globalThis.loadPyodide({
    indexURL: PYODIDE_BASE_URL,
    stdout: () => {},
    stderr: () => {},
  });

  return pyodidePromise;
}

function normalizeOutput(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
}

export async function runPythonTask({
  userCode,
  testSnippet = "",
  filename = "task.py",
}) {
  const stdout = [];
  const stderr = [];
  let pyodide = null;
  let globals = null;

  try {
    pyodide = await getPyodide();

    pyodide.setStdout({
      batched: (msg) => {
        stdout.push(msg.replace(/\n$/, ""));
      },
    });

    pyodide.setStderr({
      batched: (msg) => {
        stderr.push(msg.replace(/\n$/, ""));
      },
    });

    pyodide.setStdin({ error: true });

    const fullCode = testSnippet ? `${userCode}\n\n${testSnippet}` : userCode;

    globals = pyodide.runPython("dict()");

    await pyodide.loadPackagesFromImports(fullCode);

    const result = await pyodide.runPythonAsync(fullCode, {
      globals,
      filename,
    });

    let output = stdout.join("\n");

    if (!output && result !== undefined && result !== null) {
      output = String(result);
    }

    return {
      ok: true,
      output: normalizeOutput(output),
      stderr: normalizeOutput(stderr.join("\n")),
      error: "",
    };
  } catch (error) {
    return {
      ok: false,
      output: normalizeOutput(stdout.join("\n")),
      stderr: normalizeOutput(stderr.join("\n")),
      error: normalizeOutput(error?.message || String(error)),
    };
  } finally {
    try {
      globals?.destroy?.();
    } catch {
      // ignore
    }
  }
}

export function isOutputMatch(actual, expected) {
  return normalizeOutput(actual) === normalizeOutput(expected);
}