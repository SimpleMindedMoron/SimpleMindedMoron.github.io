import { useState, useRef, useEffect } from "react";

const INITIAL_LINES = [
  { type: "system", text: "SIMPLICITY_OS COMMAND INTERPRETER v98.4 [EMBEDDED & WEB]" },
  { type: "system", text: "Copyright (C) 1998-2026 Arjun Sanesh. All rights reserved." },
  { type: "system", text: "Dual-Boot Runtime: Linux Mint 21.3 / Windows 11." },
  { type: "hint", text: "Click any command shortcut below or type commands directly:" },
];

const SUGGESTED_COMMANDS = [
  "whoami",
  "skills",
  "hardware",
  "projects",
  "neofetch",
  "contact",
  "clear",
];

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

    const newEntries = [{ type: "prompt", text: `C:\\WIN98\\SYSTEM> ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          text: `Available Commands:
  • whoami    - About Arjun Sanesh & background
  • skills    - Technical toolkit & stack breakdown
  • hardware  - Microcontrollers, sensors & robotics
  • projects  - Software applications & hardware builds
  • neofetch  - System information & hardware specs
  • contact   - Profiles & direct transmission email
  • clear     - Clear terminal buffer
  • date      - Print current system time`,
        });
        break;

      case "whoami":
        newEntries.push({
          type: "output",
          text: `[USER]: Arjun Sanesh (@Simplicity005)
[ROLE]: Software & Embedded Systems Engineer
[LOCATION]: Bangalore, Karnataka, India
[PASSION]: High-utility web architectures, microcontroller firmware, and robotics automation.
[WORKFLOW]: Dual-boot engineer using Linux Mint for agility/ROS and Windows 11 for hardware toolchains.`,
        });
        break;

      case "skills":
        newEntries.push({
          type: "output",
          text: `[LANGUAGES]:  C++, Python, JavaScript (ES6+), Modern CSS, HTML5, Bash
[FRAMEWORKS]: React 19, Vite, Node.js, ROS 2, Express, FreeRTOS
[HARDWARE]:   ESP32 (WROOM-32), Arduino Uno/Nano, Raspberry Pi, Sensors, Relays
[PROTOCOLS]:  I2C, SPI, UART, REST APIs, WebSockets, MQTT
[DEV TOOLS]:  Git, VS Code, PlatformIO, Linux Mint CLI, Zsh, PlatformIO`,
        });
        break;

      case "hardware":
        newEntries.push({
          type: "output",
          text: `[BENCH CONFIGURATION]:
  • ESP-WROOM-32 Dual-Core @ 240MHz: Laser tripwire & IoT telemetry
  • Arduino Microcontrollers: Sensor ADC conversion, motor PWM
  • Sensor Peripherals: Ultrasonic sonar, LiDAR, IR optical breaks, relay triggers
  • Automation Lab: Automated switching circuits & differential-drive chassis`,
        });
        break;

      case "projects":
        newEntries.push({
          type: "output",
          text: `[ACTIVE SYSTEM REPOSITORIES]:
  1. Laser Security Grid (ESP32 / Laser / Optocouplers / C++)
  2. ROS 2 Autonomous Robot (LiDAR / SLAM / Differential Drive)
  3. Interactive Web Portfolio (React / Neo-Brutalist Win98 / Canvas)
  4. Real-time Telemetry Dashboard (Node.js / WebSockets / Charting)`,
        });
        break;

      case "neofetch":
        newEntries.push({
          type: "output",
          text: `         .---.          arjun@simplicity-win98
        /     \\         ----------------------
       | () () |        OS: Linux Mint 21.3 / Windows 11 Dual-Boot
        \\  -  /         Kernel: 6.5.0-x86_64
         \`---\`          Shell: Zsh 5.9 / Bash
       /|     |\\        Terminal: Neo-Brutalist Command Shell v98.4
      / |     | \\       CPU: Intel Core i7 / ESP32 Dual-Core 240MHz
     (  |     |  )      Memory: 32GB DDR4 RAM / 520KB SRAM
      \`-\`     \`-\`       Architecture: Full-Stack Web + Embedded Systems
                        Status: Open for engineering opportunities`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `[DIRECT TRANSMISSION]:
  • Email:     arjunsanesh@gmail.com
  • LinkedIn:  https://www.linkedin.com/in/arjun-sanesh/
  • GitHub:    https://github.com/Simplicity005
  • Instagram: https://www.instagram.com`,
        });
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      case "date":
        newEntries.push({
          type: "output",
          text: `Current System Time: ${new Date().toString()}`,
        });
        break;

      default:
        newEntries.push({
          type: "error",
          text: `Bad command or file name: '${cmd}'. Type 'help' for available system commands.`,
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
        {/* Section Header */}
        <div className="section-header-block">
          <div className="neo-badge neo-badge-magenta">
            <span className="badge-bullet">■</span>
            <span>SYSTEM INTERFACE // 03</span>
          </div>
          <h2 className="section-heading">
            Command Interpreter & <br />
            <span>Interactive Terminal.</span>
          </h2>
          <p className="section-subtext">
            Execute real-time commands to query developer biography, technical stack, hardware specifications, and system telemetry.
          </p>
        </div>

        {/* Windows 98 / MS-DOS Terminal Window */}
        <div className="neo-window terminal-window">
          {/* Windows 98 Command Prompt Titlebar */}
          <div className="neo-titlebar neo-titlebar-terminal">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">📟</span>
              <span className="neo-titlebar-text">C:\WIN98\COMMAND.COM - [80x25]</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          {/* Quick Command Action Chips (Solid Accent Blocks per reference sheet) */}
          <div className="terminal-quick-chips">
            <span className="chips-label">QUICK MACROS:</span>
            {SUGGESTED_COMMANDS.map((cmd, idx) => {
              const colors = ["neo-tag-yellow", "neo-tag-teal", "neo-tag-magenta", "neo-tag-lime"];
              return (
                <button
                  key={cmd}
                  type="button"
                  className={`neo-tag ${colors[idx % colors.length]} terminal-macro-btn`}
                  onClick={() => runCommand(cmd)}
                >
                  <span>&gt; {cmd}</span>
                </button>
              );
            })}
          </div>

          {/* Terminal Screen Console */}
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

            {/* Active Command Input Line */}
            <div className="terminal-input-row">
              <span className="terminal-prompt-str">C:\WIN98\SYSTEM&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-active-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. whoami, neofetch)..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Windows 98 Bottom Status Bar */}
          <div className="neo-statusbar">
            <span className="statusbar-item">BUFFER: READY</span>
            <span className="statusbar-item">CODEPAGE: 437 (US-ASCII)</span>
            <span className="statusbar-item statusbar-fill">TYPE 'HELP' FOR ALL COMMANDS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terminal;
