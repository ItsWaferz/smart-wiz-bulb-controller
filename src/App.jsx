import { useState } from "react";
import Bulb from "./Bulb";
import Card from "./Card";
import * as Icons from "lucide-react";

function App() {
  const [bulbSettings, setBulb] = useState({
    isOn: false,
    color: "#ffcc00",
    brightness: 100,
  });

  let scenes = [
    {
      id: 1,
      name: "Relax",
      color: "#ffa500",
      brightness: 70,
      icon: Icons.Armchair,
    },
    {
      id: 2,
      name: "Focus",
      color: "#ffffff",
      brightness: 100,
      icon: Icons.Book,
    },
    {
      id: 3,
      name: "Night Light",
      color: "#0000ff",
      brightness: 30,
      icon: Icons.Moon,
    },
  ];

  let colors = [
    {
      id: 1,
      name: "Red",
      color: "#ff0000",
      brightness: 60,
      backgroundColor: "#ff0000",
    },
    {
      id: 2,
      name: "Green",
      color: "#00ff00",
      brightness: 60,
      backgroundColor: "#00ff00",
    },
    {
      id: 3,
      name: "Blue",
      color: "#0000ff",
      brightness: 60,
      backgroundColor: "#0000ff",
    },
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

      <div className="cards-container">
        <Card
          title="Scenes"
          content={scenes}
          onItemClick={handleSceneChange}
          customClass="scenes"
        />

        <Card title="Colors" content={colors} onItemClick={handleSceneChange} />
      </div>

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
