import optimizationImage from "../assets/images/Optimization_Modelling.png";
import probabilisticImage from "../assets/images/Probabilistic_Modelling.png";
import roboticsImage from "../assets/images/ROS_Robotics.jpg";

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "research", label: "Research & Modeling" },
  { id: "hardware", label: "Hardware & IoT" },
  { id: "software", label: "Software & Systems" },
];

export const projects = [
  {
    id: 1,
    category: "research",
    title: "Startup Hub Optimization",
    subtitle: "Multi-Objective Spatial Optimization in Bangalore",
    description:
      "A multi-objective optimization research project using Python and MATLAB to determine the most accessible, high-traffic, and cost-effective geographic placements for startup incubators across Bangalore.",
    longDescription:
      "Engineered a computational framework combining geospatial node graphs, demographic density metrics, transit proximity, and commercial real-estate overheads. Formulated as a Pareto-optimal multi-objective integer programming problem solved via simulated annealing and genetic algorithms.",
    image: optimizationImage,
    tags: ["Python", "MATLAB", "Optimization", "Spatial Analysis", "NumPy"],
    stats: [
      { label: "Optimal Nodes", value: "14 Hubs" },
      { label: "Transit Reach", value: "92% Coverage" },
      { label: "Cost Reduction", value: "28.4%" },
    ],
    architecture: [
      "Geospatial data ingestion & graph representation (NetworkX, OpenStreetMap)",
      "Multi-objective objective cost & latency cost matrix construction",
      "Heuristic optimization execution in MATLAB & Python algorithmic pipeline",
      "Interactive heatmaps & contour plots generation for stakeholders",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    category: "research",
    title: "Fake News Propagation Modeling",
    subtitle: "Stochastic Branching & Epidemic Network Analysis",
    description:
      "Probability-based computational research modeling the viral velocity and cascade depth of misinformation in social networks using stochastic differential models and Galton-Watson branching processes.",
    longDescription:
      "Investigated how algorithmic echo chambers alter reproductive ratios (R0) of viral falsehoods compared to verified facts. Designed Monte Carlo simulations across scale-free and small-world network topologies, demonstrating targeted inoculation thresholds for countering disinformation spikes.",
    image: probabilisticImage,
    tags: ["Probability", "Stochastic Models", "Python", "Network Science", "Monte Carlo"],
    stats: [
      { label: "Simulated Nodes", value: "50,000+" },
      { label: "Cascade Accuracy", value: "94.6%" },
      { label: "Inoculation Gain", value: "3.2x Decay" },
    ],
    architecture: [
      "Scale-free network generation via Barabási-Albert model",
      "Modified SIR/SIS compartmental contagion equations with belief decay",
      "Branching process extinction probability computation",
      "Comparative parameter sweeps analyzing influencer vs cluster seeding",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    category: "hardware",
    title: "IoT Laser Security & Automation Matrix",
    subtitle: "Embedded Physical Security & Sensor Systems",
    description:
      "Full hardware builds including a multi-beam laser tripwire security grid, ultrasonic-guided smart parking logic, and real-time telemetry pipelines running on ESP32 & Arduino microcontrollers.",
    longDescription:
      "Crafted an interactive hardware security grid with optical receiver arrays, piezo sirens, relay actuation, and wireless MQTT alerts dispatching to local dashboards. Features interrupt-driven C++ firmware for sub-millisecond trip detection and fail-safe power management.",
    image: roboticsImage,
    tags: ["ESP32", "Arduino", "C++", "IoT", "Sensors & Relays", "Hardware"],
    stats: [
      { label: "Trip Latency", value: "< 2ms" },
      { label: "Power Efficiency", value: "Deep Sleep 15uA" },
      { label: "Telemetry", value: "MQTT / BLE" },
    ],
    architecture: [
      "Hardware schematic design, breadboard prototyping & custom perfboard soldering",
      "Interrupt-driven C++ embedded firmware running on FreeRTOS task scheduler",
      "Dual ESP32 / Arduino Uno cooperative serial handshake",
      "Web telemetry dashboard with live state relays and sound triggers",
    ],
    github: "https://github.com/Simplicity005",
    year: "2023 - 2024",
    featured: true,
  },
  {
    id: 4,
    category: "hardware",
    title: "Autonomous Robotics & SLAM Node",
    subtitle: "ROS-Driven Mapping & Obstacle Navigation",
    description:
      "Robotics control experiments utilizing Robot Operating System (ROS), LiDAR simulation, and sensor-fusion algorithms for autonomous mobile robotic path planning.",
    longDescription:
      "Implemented differential drive kinematics, odometer tracking, and Gmapping SLAM algorithms in a simulated warehouse environment. Developed obstacle-avoidance state machines using LiDAR scans and A* path trajectory generation.",
    image: roboticsImage,
    tags: ["ROS", "Python", "C++", "SLAM", "Robotics", "Linux Mint"],
    stats: [
      { label: "Mapping", value: "2D LiDAR SLAM" },
      { label: "Localization", value: "AMCL Particle Filter" },
      { label: "Update Rate", value: "50 Hz Control Loop" },
    ],
    architecture: [
      "URDF robot kinematic model specification & TF transform trees",
      "Laser scan point-cloud filtering & occupancy grid generation",
      "Costmap2D integration with DWA local planner",
      "Real-time teleoperation node with safety deadman switch",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
    featured: false,
  },
  {
    id: 5,
    category: "software",
    title: "Simplicity Interactive Portfolio & Terminal",
    subtitle: "Modern Web Engineering with Zero Build Bloat",
    description:
      "A fast, high-interactivity personal portfolio engineered with React 19, modern CSS tokens, Web Audio API sound synthesis, 3D tilt interactions, and an embedded terminal command center.",
    longDescription:
      "Built with a focus on tactile responsiveness, accessibility, and modern CSS standards (CSS containment, individual transforms, custom properties, glassmorphism). Features zero-asset audio synthesis, interactive hardware emulator, and smooth responsive layouts.",
    image: optimizationImage,
    tags: ["React 19", "Vite", "Web Audio API", "Modern CSS", "JavaScript"],
    stats: [
      { label: "Lighthouse", value: "100 Perf" },
      { label: "Audio Size", value: "0 KB (Synthesized)" },
      { label: "Framework", value: "Vite + React" },
    ],
    architecture: [
      "Component-driven reactive UI architecture with strict separation of concerns",
      "Synthesized sound system via Web Audio API oscillators and gain nodes",
      "Hardware workbench emulator with live serial output stream",
      "Glassmorphic design system utilizing modern CSS variables and backdrop filters",
    ],
    github: "https://github.com/Simplicity005/Simplicity005.github.io",
    year: "2025",
    featured: false,
  },
];
