#💡 WizBulb Remote
Hey there! 👋 This is my DIY Smart Home project where I’m building a custom ecosystem to control my lights. No more relying on third-party apps—I'm building my own bridge between the web and physical hardware.

🏠 What’s this about?

The goal is to have full control over my smart bulbs through two different channels that work in perfect sync:

The Web App: A clean, modern dashboard to toggle lights from any device.

The Physical Switch: A custom-built Wi-Fi smart switch that I designed and assembled myself.

The "brain" of the operation is an Arduino (acting as the backend/controller). It listens for commands from the React frontend and simultaneously monitors Wi-Fi signals from the physical switch to update the bulb's state in real-time.

🛠️ Tech Stack

Frontend: React (State management, responsive UI).

Hardware/Backend: Arduino (C++) managing the logic and Wi-Fi communication.

Connectivity: Wi-Fi (ESP8266/ESP32) for the switch-to-hub communication.

🚧 Current Project Status

This project is a Work in Progress:

✅ Frontend: The React web app is fully complete and ready to go. The UI is polished and the state logic is set up.

⏳ Backend & Hardware: I’m currently tinkering with the Arduino logic. I'm focusing on handling parallel inputs (app vs. physical switch) to ensure the system stays in sync without lag.

🚀 Roadmap

Finish the Arduino backend logic.

Optimize the Wi-Fi handshake between the custom switch and the hub.

Add a "Night Mode" or scheduling feature in the React dashboard.

Feel free to poke around the code! If you have any suggestions on how to handle the hardware-software synchronization better, I’m all ears. 🍻
