import optimizationImage from "../assets/images/Optimization_Modelling.png";
import roboticsImage from "../assets/images/ROS_Robotics.jpg";

export const categories = [
  { id: "all", label: "All Works" },
  { id: "hardware", label: "Hardware & Embedded" },
  { id: "software", label: "Software & Systems" },
];

export const projects = [
  {
    id: 1,
    category: "hardware",
    title: "IoT Laser Security Grid",
    subtitle: "Interrupt-Driven Optical Tripwire Matrix",
    description:
      "Physical security hardware build featuring an optical laser tripwire array, relay triggers, and sub-millisecond interrupt handling on ESP32 and Arduino microcontrollers.",
    longDescription:
      "Engineered an interrupt-driven optical perimeter system using multi-beam laser diodes, photo-receivers, buzzer sirens, and relay triggers. Optimized with FreeRTOS multitasking on ESP32 to achieve sub-2ms reaction latency and low-power standby operation.",
    image: roboticsImage,
    tags: ["ESP32", "Arduino", "Embedded C++", "Relays", "Hardware"],
    stats: [
      { label: "Trip Latency", value: "< 2ms" },
      { label: "Architecture", value: "Interrupts" },
      { label: "Telemetry", value: "Serial / MQTT" },
    ],
    architecture: [
      "Custom perfboard soldering and photodiode signal conditioning",
      "Hardware interrupt handlers (IRAM_ATTR) for zero-latency beam break capture",
      "Inter-board serial communication between Arduino Uno and ESP32",
      "Status relay actuation with fail-safe power isolation",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
  },
  {
    id: 2,
    category: "software",
    title: "Startup Hub Spatial Optimizer",
    subtitle: "Multi-Objective Geographic Placement Tool",
    description:
      "Algorithmic decision tool in Python and MATLAB to compute accessible, cost-effective placement locations for startup hubs across urban Bangalore.",
    longDescription:
      "Constructed a multi-objective computational solver combining transit proximity, demographic density, and commercial overheads. Employs heuristic optimization algorithms to produce Pareto-optimal geographic coordinates with interactive contour visualizers.",
    image: optimizationImage,
    tags: ["Python", "MATLAB", "Algorithms", "Geospatial", "NumPy"],
    stats: [
      { label: "Target Nodes", value: "14 Locations" },
      { label: "Transit Reach", value: "92% Area" },
      { label: "Cost Saving", value: "28.4%" },
    ],
    architecture: [
      "Geospatial node graph parsing and distance-cost matrix generation",
      "Multi-objective integer optimization implementation in Python and MATLAB",
      "Pareto frontier evaluation and parameter sweeps",
      "Automated heatmaps and route density plotting",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
  },
  {
    id: 3,
    category: "hardware",
    title: "Autonomous Robotics & SLAM Node",
    subtitle: "ROS 2 LiDAR Mapping & Path Planning",
    description:
      "Mobile robotics control stack utilizing Robot Operating System (ROS 2), LiDAR point-cloud processing, and obstacle navigation state machines.",
    longDescription:
      "Developed differential-drive robot control nodes in ROS 2 on Linux Mint. Integrated 2D LiDAR scanning, wheel encoder odometry, and SLAM occupancy grid mapping for autonomous corridor navigation.",
    image: roboticsImage,
    tags: ["ROS 2", "Python", "C++", "LiDAR", "Linux Mint"],
    stats: [
      { label: "Mapping", value: "2D SLAM" },
      { label: "Control Loop", value: "50 Hz" },
      { label: "Environment", value: "Linux Mint" },
    ],
    architecture: [
      "Coordinate frame transforms (odom -> base_link -> laser_frame)",
      "LiDAR range filtering and costmap obstacle avoidance",
      "Differential drive velocity publisher via geometry_msgs/Twist",
      "Real-time sensor telemetry logging and diagnostics",
    ],
    github: "https://github.com/Simplicity005",
    year: "2024",
  },
  {
    id: 4,
    category: "hardware",
    title: "Smart Ultrasonic Parking System",
    subtitle: "Automated Distance Sensing & Slot Monitor",
    description:
      "Hardware parking guidance system utilizing HC-SR04 ultrasonic sensor arrays, threshold logic, and automated occupancy indicators.",
    longDescription:
      "Designed and calibrated an ultrasonic sensor array with Arduino to detect vehicle occupancy in real-time. Features pulse-width calculation, debounce filtering, and visual LED / buzzer signaling for drivers.",
    image: roboticsImage,
    tags: ["Arduino", "Sensors", "Embedded C++", "Hardware"],
    stats: [
      { label: "Sensor Tech", value: "Ultrasonic" },
      { label: "Accuracy", value: "±1 cm" },
      { label: "Logic", value: "Real-time" },
    ],
    architecture: [
      "High-precision echo pulse timing and distance formula translation",
      "Software debounce filtering to prevent false vehicle detections",
      "Multiplexed LED indicators showing bay availability",
      "Serial diagnostic stream for central monitoring",
    ],
    github: "https://github.com/Simplicity005",
    year: "2023",
  },
  {
    id: 5,
    category: "software",
    title: "Simplicity Portfolio & Systems UI",
    subtitle: "High-Performance Reactive Web Architecture",
    description:
      "Clean, minimalist personal portfolio engineered with React 19 and modern CSS tokens. Zero build bloat, fluid physics cursor, and interactive hardware bench.",
    longDescription:
      "A fast, distraction-free portfolio interface prioritizing typography, negative space, and instant responsiveness. Built with pure modular CSS, composite-only animations, and zero heavy dependencies.",
    image: optimizationImage,
    tags: ["React 19", "JavaScript", "Vite", "Modern CSS"],
    stats: [
      { label: "Performance", value: "100 Score" },
      { label: "CSS Size", value: "Minimal" },
      { label: "Build Time", value: "< 1s" },
    ],
    architecture: [
      "Component-driven reactive architecture without heavy UI libraries",
      "Zero-overhead custom fluid cursor with Lerp physics",
      "Integrated virtual hardware workbench and interactive terminal",
      "Fluid responsive layout for mobile, tablet, and widescreen",
    ],
    github: "https://github.com/Simplicity005/Simplicity005.github.io",
    year: "2025",
  },
];
