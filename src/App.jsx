import { useState } from "react";
import Bulb from "./Bulb";

function App() {
  const [bulbSettings, setBulb] = useState({
    isOn: false,
    color: "#ffcc00",
    brightness: 100,
  });

  return (
    <div className="app">
      <h1>Smart Wiz Controller</h1>

      <Bulb
        settings={bulbSettings}
        onToggle={() => setBulb((prev) => ({ ...prev, isOn: !prev.isOn }))}
      />
    </div>
  );
}

export default App;
