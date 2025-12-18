import { useState } from "react";
import Bulb from "./Bulb";
import Card from "./Card";

function App() {
  const [bulbSettings, setBulb] = useState({
    isOn: false,
    color: "#ffcc00",
    brightness: 100,
  });

  let scenes = [
    { id: 1, name: "Relax", color: "#ffa500", brightness: 70 },
    { id: 2, name: "Focus", color: "#ffffff", brightness: 100 },
    { id: 3, name: "Night Light", color: "#0000ff", brightness: 30 },
  ];

  let colors = [
    { id: 1, name: "Red", color: "#ff0000", brightness: 60 },
    { id: 2, name: "Green", color: "#00ff00", brightness: 60 },
    { id: 3, name: "Blue", color: "#0000ff", brightness: 60 },
  ];

  const handleSceneChange = (scene) => {
    setBulb(() => ({
      isOn: true,
      color: scene.color,
      brightness: scene.brightness,
    }));
  };

  const handleBrightnessChange = (e) => {
    const newValue = e.target.value;
    if (newValue == 0) setBulb({ ...bulbSettings, isOn: false, brightness: 0 });
    else setBulb({ ...bulbSettings, isOn: true, brightness: newValue });
  };

  return (
    <div className="app">
      <h1>Smart Wiz Controller</h1>

      <Bulb
        settings={bulbSettings}
        onToggle={() => setBulb((prev) => ({ ...prev, isOn: !prev.isOn }))}
      />

      <Card title="Scenes" content={scenes} onItemClick={handleSceneChange} />

      <Card title="Colors" content={colors} onItemClick={handleSceneChange} />

      <input
        type="range"
        min="0"
        max="100"
        value={bulbSettings.brightness}
        onChange={handleBrightnessChange}
        className="brightness-slider"
      />
    </div>
  );
}

export default App;
