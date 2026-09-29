import { useState, useRef, useEffect } from "react";
import { playSound } from "../../utils/audio";

const INITIAL_LINES = [
  { type: "system", text: "SimplicityOS Terminal v3.4 [Embedded & Web Environment]" },
  { type: "system", text: "Dual-Boot Kernel: Linux Mint 21.3 / Windows 11 detected." },
  { type: "hint", text: "Type 'help' or click any command shortcut below to explore:" },
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
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const runCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playSound("terminal");
    setCommandHistory((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const newEntries = [{ type: "prompt", text: `arjun@simplicity:~$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          text: `Available Commands:
  • whoami    - About Arjun Sanesh & background
  • skills    - Technical toolkit & stack breakdown
  • hardware  - Microcontrollers, sensors & robotics
  • projects  - Research papers & engineering builds
  • neofetch  - System information & hardware specs
  • contact   - Social links & email
  • clear     - Clear terminal buffer
  • date      - Print current local time`,
        });
        break;

      case "whoami":
        newEntries.push({
          type: "output",
          text: `ARJUN SANESH (Online moniker: Simplicity / Simple Minded Moron)
Role: Full-Stack Developer & Hardware Hacker
Location: Bangalore, India
Mindset: Passionate about clean visual design, bare-metal hardware circuits,
and stochastic research. If it has code or electrons, I want to take it apart
and rebuild it better. Dual-boots Linux Mint & Windows.`,
        });
        break;

      case "skills":
        newEntries.push({
          type: "output",
          text: `TECHNICAL ARSENAL:
  [Web & Frontend]  : React 19, JavaScript (ESNext), Modern CSS, HTML5, Vite
  [Hardware & IoT]  : ESP32, Arduino Uno/Nano, Raspberry Pi, FreeRTOS, C/C++
  [Sensors & Proto] : LiDAR, Laser Tripping, Ultrasonic, Relays, I2C, SPI, UART
  [AI & Research]   : MATLAB, Python (NumPy, SciPy, NetworkX), Stochastic Modeling
  [Robotics]        : ROS 2, Gazebo Simulation, SLAM, Kinematics
  [Dev Environment] : Linux Mint, Windows 11, Git, Bash, VS Code`,
        });
        break;

      case "hardware":
        newEntries.push({
          type: "output",
          text: `HARDWARE LAB INVENTORY:
  • ESP-WROOM-32 : Wi-Fi & BLE dual core IoT controller
  • Arduino Uno  : Real-time sensor multiplexing & PWM actuator grid
  • Laser Grid   : Optical tripwire perimeter with <2ms alert latency
  • Smart Sonar  : Ultrasonic automated parking guide
  • ROS Rover    : LiDAR-driven obstacle mapping & path planning`,
        });
        break;

      case "projects":
        newEntries.push({
          type: "output",
          text: `KEY WORKS:
  1. Startup Hub Optimization       [MATLAB / Python / Spatial Graph]
  2. Fake News Stochastic Modeling  [Branching Processes / Monte Carlo]
  3. IoT Laser Grid & Security      [ESP32 / Arduino / Relays]
  4. Autonomous Mobile Robot        [ROS 2 / SLAM / LiDAR]
  5. Simplicity Interactive Web     [React 19 / Canvas Shaders / Audio]
(Scroll to 'Selected Works' below or click any card for interactive specs)`,
        });
        break;

      case "neofetch":
        newEntries.push({
          type: "ascii",
          text: `
    /\\_/\\     arjun@simplicity-rig
   ( o.o )    --------------------
    > ^ <     OS: Linux Mint 21.3 / Windows 11 Dual-Boot
              Host: Custom Workstation & Embedded Rig
              Kernel: 6.5.0-x86_64-simplicity
              Uptime: 3+ years tinkering non-stop
              Shell: zsh / bash / pwsh
              Terminal: React19 Web-Virtual-PTY
              Hardware: ESP32, Arduino, Raspberry Pi, Logic Analyzers
              Memory: Infinite Curiosity
`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `CONNECT WITH ARJUN:
  • Email     : arjunsanesh@gmail.com
  • LinkedIn  : https://www.linkedin.com/in/arjun-sanesh/
  • GitHub    : https://github.com/Simplicity005
  • Instagram : @simplicity.codes`,
        });
        break;

      case "date":
        newEntries.push({
          type: "output",
          text: `Current System Time: ${new Date().toString()}`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newEntries.push({
          type: "error",
          text: `simplicity: command not found: '${rawCmd}'. Type 'help' to see valid commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? commandHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < commandHistory.length) {
          setCmdIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setCmdIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <section className="terminal-section" id="terminal">
      <div className="terminal-wrapper">
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot cyan"></span>
            <span>INTERACTIVE CLI COMMAND CENTER</span>
          </div>
          <h2 className="section-heading">
            Prefer the Command Line? <br />
            <span className="gradient-text-cyan">Run commands directly.</span>
          </h2>
          <p className="section-subtext">
            For fellow terminal geeks: inspect my environment, inspect projects, or trigger custom outputs right here.
          </p>
        </div>

        {/* The Window Box */}
        <div className="terminal-box" onClick={() => inputRef.current?.focus()}>
          {/* Title Bar */}
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">arjun@simplicity: ~ (zsh/mint)</div>
            <div className="terminal-status-badge">
              <span className="pulse-mini"></span>
              <span>LIVE PTY</span>
            </div>
          </div>

          {/* Quick command suggestion chips */}
          <div className="terminal-quick-chips">
            <span className="chips-label">QUICK COMMANDS:</span>
            {SUGGESTED_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                className="chip-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  runCommand(cmd);
                }}
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Output log */}
          <div className="terminal-body">
            {history.map((line, idx) => (
              <div key={idx} className={`terminal-line ${line.type}`}>
                {line.type === "ascii" ? (
                  <pre className="ascii-art">{line.text}</pre>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt input row */}
          <div className="terminal-input-row">
            <span className="terminal-user-badge">arjun@simplicity:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or click quick commands above..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terminal;
