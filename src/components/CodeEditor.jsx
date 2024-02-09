import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AceEditor from "react-ace";
import { io } from "socket.io-client"; // Importing socket.io-client
import Chat from "./Chat";
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
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(18);
  const [socket, setSocket] = useState(null); // State for socket

  useEffect(() => {
    const newSocket = io("http://localhost:8080"); // Establishing socket connection
    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect(); // Disconnecting socket on unmount
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Socket.io client connected");
    });

    socket.on("currentCode", (newCode) => {
      console.log("Received current code from server:", newCode);
      setCode(newCode);
    });

    return () => {
      console.log("Socket.io client disconnected");
    };
  }, [socket]);

  useEffect(() => {
    if (location.state && location.state.roomData.room) {
      setRoomData(location.state.roomData.room);
    }
  }, [location]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (socket) {
      socket.emit("message", newCode); // Emitting code change to server
    }
  };

  const runCode = () => {
    if (socket) {
      socket.emit("message", code); // Emitting code run request to server
    }
    // For simplicity, let's just set the output as the input for now
    setOutput(input);
  };

  const copyRoomInfo = () => {
    if (!roomData) return;
    const roomInfo = `Room ID: ${roomData.roomId}, Room Name: ${roomData.roomName}`;
    navigator.clipboard.writeText(roomInfo)
      .then(() => {
        console.log("Room info copied to clipboard:", roomInfo);
      })
      .catch((error) => {
        console.error("Error copying room info:", error);
      });
  };

  return (
    <div>
      <div className="flex gap-5 py-7">
        <div>
          <label htmlFor="language-select" className="text-white text-lg pl-5">Language:</label>
          <select
            id="language-select"
            value={language}
            className="rounded-lg px-3 h-10 w-30 ml-3"
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
          <label htmlFor="theme-select" className="text-white text-lg ml-1">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            className="rounded-lg px-3 h-10 w-30 ml-3"
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
          <label className="text-white text-lg ml-1">Font Size:</label>
          <input
            type="number"
            id="font-size-select"
            className="rounded-lg px-3 h-10 w-14 ml-2"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>

        <button onClick={runCode} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold" style={{marginLeft:"11vw"}}>Run Code</button>
        <button onClick={copyRoomInfo} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold" style={{marginLeft:"13.5vw"}}>Copy Room Info</button>
      </div>

      <div className="flex gap-7 mx-4" style={{marginTop:"10px"}}>
        <AceEditor
          mode={language}
          theme={theme}
          fontSize={fontSize}
          value={code}
          onChange={handleCodeChange}
          width="60%"
          height="82vh"
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

        <div className="flex flex-col w-96 gap-7" style={{margin:"-22px 0"}}>
          <div>
            <label htmlFor="input-textarea" className="text-white text-lg">Input:</label>
            <AceEditor
              mode={language}
              theme={theme}
              fontSize={fontSize}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              width="100%"
              height="36.6vh"
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
          </div>
          <div>
            <label htmlFor="output-textarea" className="text-white text-lg">Output:</label>
            <AceEditor
              mode={language}
              theme={theme}
              fontSize={fontSize}
              value={output}
              width="100%"
              height="36.6vh"
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
          </div>
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default CodeEditor;
