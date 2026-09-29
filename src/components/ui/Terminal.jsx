import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

const INITIAL_LINES = [
  { type: "system", text: "SimplicityOS Terminal v3.4 [Embedded & Web Environment]" },
  { type: "system", text: "Dual-Boot Environment: Linux Mint 21.3 / Windows 11." },
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
  • projects  - Software applications & hardware builds
  • neofetch  - System information & hardware specs
  • contact   - Profiles & email
  • clear     - Clear terminal buffer
  • date      - Print current system time`,
        });
        break;

      case "whoami":
        newEntries.push({
          type: "output",
          text: `ARJUN SANESH (Simplicity / Simple Minded Moron)
Role: Software Developer & Hardware Tinkerer
Location: Bangalore, India
Focus: Building clean web applications and physical hardware systems.
Experienced with ESP32, Arduino, sensors, and full-stack web development.
Dual-boots Linux Mint & Windows 11.`,
        });
        break;

      case "skills":
        newEntries.push({
          type: "output",
          text: `TECHNICAL TOOLKIT:
  [Software & Web] : React 19, JavaScript, Modern CSS, HTML5, Vite, Node.js
  [Hardware & IoT] : ESP32, Arduino Uno/Nano, FreeRTOS, Embedded C/C++
  [Sensors & IO]   : Laser tripwires, Ultrasonic (HC-SR04), Relays, I2C, SPI, UART
  [Robotics]       : ROS 2, Gazebo, SLAM, Differential Drive
  [Environment]    : Linux Mint, Windows 11, Git, Bash`,
        });
        break;

      case "hardware":
        newEntries.push({
          type: "output",
          text: `HARDWARE INVENTORY:
  • ESP-WROOM-32 : Wi-Fi & BLE dual core IoT microcontroller
  • Arduino Uno  : Sensor multiplexing & actuator control
  • Laser Grid   : Optical tripwire perimeter with <2ms latency
  • Sonar Sensor : Ultrasonic vehicle distance detection
  • ROS 2 Node   : LiDAR mapping & differential drive navigation`,
        });
        break;

      case "projects":
        newEntries.push({
          type: "output",
          text: `FEATURED WORKS:
  1. IoT Laser Security Grid       [ESP32 / Arduino / Relays / C++]
  2. Startup Hub Spatial Optimizer [Python / MATLAB / Algorithms]
  3. Autonomous Robotics Node      [ROS 2 / SLAM / LiDAR / Linux Mint]
  4. Ultrasonic Parking System     [Arduino / HC-SR04 / Sensors]
  5. Simplicity Portfolio UI       [React 19 / Modern CSS / Vite]
(Select any card in 'Selected Works' for architecture details)`,
        });
        break;

      case "neofetch":
        newEntries.push({
          type: "ascii",
          text: `
    /\\_/\\     arjun@simplicity-rig
   ( o.o )    --------------------
    > ^ <     OS: Linux Mint 21.3 / Windows 11 Dual-Boot
              Host: Custom Embedded & Workstation Rig
              Kernel: 6.5.0-x86_64
              Uptime: 3+ years tinkering
              Shell: zsh / bash
              Terminal: Web PTY
              Hardware: ESP32, Arduino Uno, Sensor Arrays
`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `CONNECT:
  • Email     : arjunsanesh@gmail.com
  • LinkedIn  : https://www.linkedin.com/in/arjun-sanesh/
  • GitHub    : https://github.com/Simplicity005
  • Instagram : https://www.instagram.com`,
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
      <motion.div
        className="terminal-container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot minimal"></span>
            <span>CLI INTERFACE</span>
          </div>
          <h2 className="section-heading">
            Command Center & <br />
            <span>Terminal.</span>
          </h2>
          <p className="section-subtext">
            For terminal workflows: run commands directly to inspect environment, skills, and projects.
          </p>
        </div>

        {/* The Window Box */}
        <div className="terminal-box" onClick={() => inputRef.current?.focus()}>
          {/* Title Bar */}
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="terminal-title">arjun@simplicity: ~ (mint/zsh)</div>
            <div className="terminal-status-badge">
              <span className="pulse-mini"></span>
              <span>READY</span>
            </div>
          </div>

          {/* Quick command suggestion chips */}
          <div className="terminal-quick-chips">
            <span className="chips-label">COMMANDS:</span>
            {SUGGESTED_COMMANDS.map((cmd) => (
              <motion.button
                key={cmd}
                type="button"
                className="chip-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  runCommand(cmd);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                ${cmd}
              </motion.button>
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
              placeholder="type 'help' or click commands above..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Terminal;
