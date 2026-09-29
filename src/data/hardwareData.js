export const hardwareBoards = [
  {
    id: "esp32",
    name: "ESP-WROOM-32 DevKit",
    role: "IoT Core & Wireless Hub",
    badge: "240MHz Dual-Core Xtensa",
    specs: {
      voltage: "3.3V Logic",
      connectivity: "Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BR/EDR & BLE",
      memory: "520 KB SRAM / 4MB Flash",
      os: "FreeRTOS / Arduino C++",
    },
    pins: [
      { pin: "GPIO 2", role: "Built-in Blue LED", type: "Digital Out / Status", active: true },
      { pin: "GPIO 21", role: "I2C SDA (OLED Display / Sensors)", type: "I2C Bus", active: true },
      { pin: "GPIO 22", role: "I2C SCL (Clock Line)", type: "I2C Bus", active: true },
      { pin: "GPIO 34", role: "Laser Photodiode Sensor", type: "ADC / Analog In", active: true },
      { pin: "GPIO 4", role: "Relay Trigger / Siren Control", type: "Digital Out", active: false },
      { pin: "GPIO 15", role: "Ultrasonic Trigger Pulse", type: "PWM / Fast Pulse", active: true },
    ],
    sampleCode: `// ESP32 Telemetry & Laser Detection Interrupt
void IRAM_ATTR onLaserBreak() {
  alarmTriggered = true;
  digitalWrite(RELAY_PIN, HIGH);
  Serial.println("[ALERT] Laser Beam Interrupted! Latency: 1.4ms");
}`,
    logs: [
      "[BOOT] ESP32 dual core initialized. FreeRTOS kernel running.",
      "[NET] Connected to local SSID 'Lab_Node_5G' (IP: 192.168.1.104).",
      "[SENSORS] Optical photodiode calibrated: ambient 342 / threshold 850.",
      "[MQTT] Subscribed to telemetry/security/state.",
      "[STATUS] Armed and monitoring security perimeter at 1000Hz...",
    ],
  },
  {
    id: "arduino",
    name: "Arduino Uno R3 & Sensor Grid",
    role: "Real-Time Embedded Controller",
    badge: "ATmega328P 16MHz AVR",
    specs: {
      voltage: "5V Operating Level",
      analogInputs: "6 Analog Channels (10-bit ADC)",
      digitalIO: "14 Digital I/O Pins (6 PWM outputs)",
      firmware: "Bare-Metal Embedded C++",
    },
    pins: [
      { pin: "Pin 13", role: "Built-in Test LED", type: "Digital Out", active: true },
      { pin: "Pin 2", role: "External Interrupt INT0", type: "Hardware Interrupt", active: true },
      { pin: "Pin 9", role: "Piezo Buzzer Alarm (PWM 2.4kHz)", type: "PWM Timer 1", active: true },
      { pin: "Pin 7", role: "Ultrasonic Echo Pulse", type: "Digital Input", active: true },
      { pin: "Pin 8", role: "Ultrasonic Trigger Output", type: "Digital Output", active: true },
      { pin: "A0", role: "Light Dependent Resistor (LDR)", type: "Analog In", active: true },
    ],
    sampleCode: `// Arduino Ultrasonic Smart Parking Distance Calc
long duration = pulseIn(ECHO_PIN, HIGH);
int distance_cm = duration * 0.034 / 2;
if (distance_cm < 15) triggerWarningBuzzer();`,
    logs: [
      "[AVR] ATmega328P clocked at 16.000 MHz.",
      "[TIMER] 16-bit Timer1 configured for frequency-agile alert buzzer.",
      "[INT0] Hardware interrupt attached on falling edge pin 2.",
      "[ULTRASONIC] HC-SR04 sonar ping: Object detected at 42.8 cm.",
      "[PARKING] Slot B-04 status changed: OCCUPIED (confidence: 99.2%).",
    ],
  },
  {
    id: "ros",
    name: "ROS 2 Autonomous Node",
    role: "Robotics Kinematics & SLAM",
    badge: "ROS 2 Humble / Linux Mint",
    specs: {
      middleware: "DDS (FastDDS / CycloneDDS)",
      navigation: "Nav2 Stack + AMCL Particle Filter",
      sensorFusion: "Robot Localization (EKF: Odometry + IMU)",
      architecture: "Distributed Pub/Sub Graph",
    },
    pins: [
      { pin: "/scan", role: "2D 360-degree LiDAR Data", type: "sensor_msgs/LaserScan", active: true },
      { pin: "/cmd_vel", role: "Linear & Angular Velocity", type: "geometry_msgs/Twist", active: true },
      { pin: "/odom", role: "Wheel Encoder Odometry", type: "nav_msgs/Odometry", active: true },
      { pin: "/map", role: "Occupancy Grid Matrix", type: "nav_msgs/OccupancyGrid", active: true },
      { pin: "/tf", role: "Coordinate Frame Tree (odom->base_link)", type: "tf2_msgs/TFMessage", active: true },
    ],
    sampleCode: `# ROS 2 Twist Command Dispatch
vel_msg = Twist()
vel_msg.linear.x = 0.35  # m/s forward
vel_msg.angular.z = -0.12 # rad/s corrective yaw
self.cmd_publisher.publish(vel_msg)`,
    logs: [
      "[ROS2] Node /simplicity_diff_drive initialized.",
      "[SLAM] Mapping transform established: /map -> /odom -> /base_link.",
      "[LIDAR] 360 ranges received. Min obstacle distance: 1.84m at 34 deg.",
      "[NAV2] Global trajectory computed via NavFn planner. Path length: 6.2m.",
      "[CONTROL] Motor PID loop converging: error < 0.01 rad.",
    ],
  },
];
