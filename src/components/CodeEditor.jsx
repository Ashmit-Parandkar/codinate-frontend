import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// Importing language modes and themes for Ace Editor
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-dracula";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(14);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const newClient = new W3CWebSocket("ws://localhost:9090");
    setClient(newClient);

    // Cleanup function to close WebSocket connection when component unmounts
    return () => {
      if (client) {
        client.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (!client) return; // Exit early if client is not yet initialized
  
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      // Convert Blob to text
      message.data.text().then((text) => {
        console.log("Message from server: ", text);
        setCode(text);
      }).catch((error) => {
        console.error("Error converting Blob to text: ", error);
      });
    };
  }, [client]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (client) {
      client.send(newCode);
    }
  };
  const runCode = () => {
    if (client) {
      client.send(code);
    }
    // You can run the code here and set the output
    // For simplicity, let's just set the output as the input for now
    setOutput(input);
  };

  return (
    <div>
      <div>
        <label htmlFor="language-select">Language:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c_cpp">C++</option>
        </select>
      </div>
      <div>
        <label htmlFor="theme-select">Theme:</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="monokai">Monokai</option>
          <option value="github">GitHub</option>
          <option value="solarized_dark">Solarized Dark</option>
          <option value="solarized_light">Solarized Light</option>
          <option value="tomorrow_night">Tomorrow Night</option>
          <option value="twilight">Twilight</option>
          <option value="dracula">Dracula</option>
        </select>
      </div>
      <div>
        <label htmlFor="font-size-select">Font Size:</label>
        <input
          type="number"
          id="font-size-select"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
      </div>
      <AceEditor
        mode={language}
        theme={theme}
        fontSize={fontSize}
        value={code}
        onChange={handleCodeChange}
        width="100%"
        height="300px"
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <div>
        <label htmlFor="input-textarea">Input:</label>
        <textarea
          id="input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="output-textarea">Output:</label>
        <textarea
          id="output-textarea"
          value={output}
          readOnly
          rows={4}
          cols={50}
        />
      </div>
      <button onClick={runCode}>Run Code</button>
    </div>
  );
};

export default CodeEditor;
