import { useState, useRef, useEffect } from "react";

const INITIAL_LINES = [
  { type: "system", text: "SIMPLICITY_OS COMMAND SHELL v98.4" },
  { type: "hint", text: "Type 'help' or click shortcuts below to query system:" },
];

const SUGGESTED_COMMANDS = ["whoami", "skills", "hardware", "projects", "clear"];

function Terminal() {
  const [history, setHistory] = useState(INITIAL_LINES);
  const [inputVal, setInputVal] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const newEntries = [{ type: "prompt", text: `arjun@simplicity:~$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          text: `Commands:
  • whoami    - About Arjun Sanesh & background
  • skills    - Technical toolkit & language stack
  • hardware  - Microcontrollers, sensors & robotics
  • projects  - Software applications & hardware builds
  • contact   - Profiles & direct email
  • clear     - Clear terminal buffer`,
        });
        break;

      case "whoami":
        newEntries.push({
          type: "output",
          text: `Arjun Sanesh (@Simplicity005)
Software & Embedded Systems Engineer based in Bangalore, India.
Dual-boot workflow: Linux Mint + Windows 11.`,
        });
        break;

      case "skills":
        newEntries.push({
          type: "output",
          text: `Languages:  C++, Python, JavaScript (ES6+), Modern CSS, HTML5, Bash
Frameworks: React 19, Vite, Node.js, ROS 2, FreeRTOS
Hardware:   ESP32 (WROOM-32), Arduino Uno/Nano, Raspberry Pi, Sensors, Relays
Buses:      I2C, SPI, UART, REST APIs, WebSockets`,
        });
        break;

      case "hardware":
        newEntries.push({
          type: "output",
          text: `ESP32 dual-core IoT circuits, laser security tripwire,
sensor ADC conversions, and differential-drive ROS 2 robotics chassis.`,
        });
        break;

      case "projects":
        newEntries.push({
          type: "output",
          text: `1. Laser Security Tripwire (ESP32 / Laser / Optocouplers / C++)
2. Autonomous Robot Platform (ROS 2 / LiDAR / Differential Drive)
3. Interactive Portfolio (React / Neo-Brutalist / Canvas Physics)
4. Telemetry Stream Dashboard (Node.js / WebSockets)`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `Email:    arjunsanesh@gmail.com
LinkedIn: linkedin.com/in/arjun-sanesh/
GitHub:   github.com/Simplicity005`,
        });
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newEntries.push({
          type: "error",
          text: `Unknown command: '${cmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        cmdIndex === -1 ? commandHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIndex = cmdIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setCmdIndex(-1);
        setInputVal("");
      } else {
        setCmdIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <section className="terminal-section" id="terminal">
      <div className="terminal-container">
        <div className="section-header-block">
          <span className="section-kicker">03 // INTERFACE</span>
          <h2 className="section-heading">
            Interactive <span>Terminal CLI.</span>
          </h2>
        </div>

        <div className="neo-window terminal-window">
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">📟</span>
              <span className="neo-titlebar-text">COMMAND_PROMPT // SHELL</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          {/* Clean Shortcuts */}
          <div className="terminal-quick-chips">
            <span className="chips-label">SHORTCUTS:</span>
            {SUGGESTED_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                className="neo-tag terminal-macro-btn"
                onClick={() => runCommand(cmd)}
              >
                <span>{cmd}</span>
              </button>
            ))}
          </div>

          {/* Console Body */}
          <div
            className="terminal-body"
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className={`terminal-line terminal-${line.type}`}>
                <pre>{line.text}</pre>
              </div>
            ))}

            <div className="terminal-input-row">
              <span className="terminal-prompt-str">arjun@simplicity:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-active-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type help..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terminal;
