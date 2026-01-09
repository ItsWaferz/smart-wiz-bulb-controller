# 💡 WizBulb Remote

Hey there! 👋 Welcome to my DIY Smart Home project. I'm building a custom ecosystem to control my lights, bridging the gap between a modern web interface and physical hardware.

### 🏠 What’s this about?
The goal is to have full control over my lighting system through two synchronized channels:
1.  **The Web App:** A clean, responsive dashboard to toggle lights from any device.
2.  **The Physical Switch:** A custom-built Wi-Fi smart switch that I designed and assembled from scratch.

The "brain" of the operation is an **Arduino** (acting as the central controller). It listens for commands from the React frontend and simultaneously monitors Wi-Fi signals from the physical switch to update the bulb's state in real-time.

---

### 🛠️ Tech Stack
* **Frontend:** `React.js` (State management, Hooks, Responsive UI).
* **Hardware/Backend:** `Arduino / C++` (Managing logic and Wi-Fi communication).
* **Connectivity:** `Wi-Fi` (ESP8266/ESP32) for switch-to-hub communication.

---

### 🚧 Current Project Status
This project is currently in active development:

- [x] **Frontend:** The React web application is **fully complete**. The UI is polished, and the state logic is ready to send commands.
- [ ] **Backend & Hardware:** Currently working on the Arduino logic. I'm focusing on handling parallel inputs (app vs. physical switch) to ensure the system stays in sync with zero latency.

---

### 🚀 Roadmap
* [ ] Finalize the Arduino backend logic for concurrent signal processing.
* [ ] Optimize the Wi-Fi handshake between the custom switch and the hub.
* [ ] Implement a "Live Sync" feature using WebSockets for real-time UI updates when the physical switch is flipped.

---

### 🤝 Contributing
Feel free to poke around the code! If you have any suggestions on how to handle the hardware-software synchronization or if you've done something similar, I’d love to hear from you. 🍻
