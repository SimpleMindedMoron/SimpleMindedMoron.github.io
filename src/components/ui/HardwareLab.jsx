import { useState, useEffect, useRef } from "react";
import { hardwareBoards } from "../../data/hardwareData";

function HardwareLab() {
  const [selectedBoardId, setSelectedBoardId] = useState("esp32");
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [logs, setLogs] = useState(() => hardwareBoards[0]?.logs || []);
  const [activePin, setActivePin] = useState(null);
  const [ledState, setLedState] = useState(false);
  const [testPulse, setTestPulse] = useState(false);
  const logContainerRef = useRef(null);

  const activeBoard = hardwareBoards.find((b) => b.id === selectedBoardId) || hardwareBoards[0];

  // Periodic simulation ticks if running
  useEffect(() => {
    if (!isSimRunning) return;
    const interval = setInterval(() => {
      const timestamps = new Date().toLocaleTimeString();
      const dynamicEvents = {
        esp32: [
          `[${timestamps}] [ADC] Laser beam intensity reading: 894 mV (CLEAR)`,
          `[${timestamps}] [WIFI] RSSI: -48 dBm | Telemetry packet published via MQTT`,
          `[${timestamps}] [HEAP] Free SRAM: 298,412 bytes | Core 0: 3.2% load`,
        ],
        arduino: [
          `[${timestamps}] [SONAR] Echo pulse width: 1420 us | Distance: 24.1 cm`,
          `[${timestamps}] [IO] Digital Pin 2 input verified STABLE | Interrupt ready`,
          `[${timestamps}] [ADC0] LDR analog sample: 742 / 1023 (ambient daylight)`,
        ],
        ros: [
          `[${timestamps}] [TOPIC] /scan: 360 ranges processed in 1.8ms`,
          `[${timestamps}] [TF] Transform broadcast: odom -> base_link (delta: +0.02m)`,
          `[${timestamps}] [NAV] Trajectory cost evaluated: obstacle clear`,
        ],
      };

      const pool = dynamicEvents[selectedBoardId] || [];
      const randomMsg = pool[Math.floor(Math.random() * pool.length)];

      setLogs((prev) => {
        const next = [...prev, randomMsg];
        if (next.length > 25) next.shift();
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimRunning, selectedBoardId]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleBoardSwitch = (id) => {
    setSelectedBoardId(id);
    const targetBoard = hardwareBoards.find((b) => b.id === id);
    if (targetBoard) {
      setLogs([...targetBoard.logs]);
    }
    setActivePin(null);
  };

  const handleTriggerTest = () => {
    setTestPulse(true);
    setLedState(true);

    const time = new Date().toLocaleTimeString();
    const testMsg = `[${time}] >>> USER TRIGGERED SIGNAL on ${activeBoard.pins[0].pin} <<<`;
    setLogs((prev) => [...prev, testMsg]);

    setTimeout(() => {
      setTestPulse(false);
      setLedState(false);
    }, 1200);
  };

  return (
    <section className="lab-section" id="hardware">
      <div className="lab-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot minimal"></span>
            <span>EMBEDDED BENCH & SENSORS</span>
          </div>
          <h2 className="section-heading">
            Hardware Lab & <br />
            <span>Interactive Workbench.</span>
          </h2>
          <p className="section-subtext">
            Physical circuits, microcontroller firmware in C++, and sensor matrices.
            Select a board below to inspect its pin assignments and live serial telemetry.
          </p>
        </div>

        {/* Workbench Card */}
        <div className="workbench-card">
          {/* Top Bar / Board Selector */}
          <div className="workbench-topbar">
            <div className="board-tabs">
              {hardwareBoards.map((board) => (
                <button
                  key={board.id}
                  type="button"
                  className={`board-tab-btn ${selectedBoardId === board.id ? "active" : ""}`}
                  onClick={() => handleBoardSwitch(board.id)}
                >
                  <span className="board-tab-indicator"></span>
                  <span className="board-tab-title">{board.name}</span>
                </button>
              ))}
            </div>

            <div className="workbench-top-actions">
              <button
                type="button"
                className={`action-btn-trigger ${testPulse ? "pulsing" : ""}`}
                onClick={handleTriggerTest}
                title="Send test pulse / interrupt signal"
              >
                <span className={`status-led ${ledState ? "on" : ""}`}></span>
                <span>Send Signal Pulse</span>
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="workbench-grid">
            {/* Visual Board Diagram / Schematic View */}
            <div className="board-visual-panel">
              <div className="board-graphic-container">
                <div className={`microcontroller-chip ${selectedBoardId} ${testPulse ? "chip-active" : ""}`}>
                  <div className="chip-notch"></div>
                  <div className="chip-label">
                    <span className="chip-arch">{activeBoard.badge}</span>
                    <span className="chip-name">{activeBoard.name}</span>
                    <span className="chip-status">
                      <span className={`chip-dot ${testPulse ? "flashing" : ""}`}></span>
                      {activeBoard.role}
                    </span>
                  </div>

                  {/* Visual LED */}
                  <div className="board-onboard-led">
                    <span className="led-label">LED</span>
                    <span className={`led-bulb ${ledState ? "lit" : ""}`}></span>
                  </div>
                </div>

                {/* Pin Matrix List */}
                <div className="board-pins-interactive">
                  <div className="pins-header">
                    <span>PINOUT & SIGNALS (SELECT TO INSPECT)</span>
                  </div>
                  <div className="pins-grid">
                    {activeBoard.pins.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`pin-pill ${activePin?.pin === p.pin ? "selected" : ""}`}
                        onClick={() => setActivePin(p)}
                      >
                        <span className="pin-indicator"></span>
                        <span className="pin-id">{p.pin}</span>
                        <span className="pin-desc">{p.role}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pin Detail Overlay or Specs */}
              <div className="pin-inspector-bar">
                {activePin ? (
                  <div className="pin-detail-active">
                    <span className="detail-tag">{activePin.pin}</span>
                    <span className="detail-role"><strong>Role:</strong> {activePin.role}</span>
                    <span className="detail-type"><strong>Protocol:</strong> {activePin.type}</span>
                  </div>
                ) : (
                  <div className="pin-detail-hint">
                    <span>Select any pin above to inspect its protocol and function.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Serial Telemetry & Specs Panel */}
            <div className="board-telemetry-panel">
              {/* Specs Grid */}
              <div className="specs-card">
                <div className="specs-header">
                  <span className="specs-title">Hardware Architecture</span>
                  <span className="specs-sub">{activeBoard.badge}</span>
                </div>
                <div className="specs-items">
                  {Object.entries(activeBoard.specs).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}:</span>
                      <span className="spec-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Serial Monitor */}
              <div className="serial-monitor">
                <div className="serial-monitor-header">
                  <div className="terminal-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <span className="serial-title">SERIAL MONITOR (115200 BAUD)</span>
                  <button
                    type="button"
                    className="serial-toggle-btn"
                    onClick={() => setIsSimRunning(!isSimRunning)}
                  >
                    {isSimRunning ? "Pause" : "Resume"}
                  </button>
                </div>

                <div className="serial-output" ref={logContainerRef}>
                  {logs.map((log, index) => (
                    <div key={index} className="serial-line">
                      <span className="line-prefix">$</span>
                      <span className="line-text">{log}</span>
                    </div>
                  ))}
                  <div className="serial-cursor"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HardwareLab;
