import { useState } from "react";
import Bulb from "./Bulb";
import Card from "./Card";
import { Sun, Heart, Moon, Tv2, Sofa, BookMarked } from "lucide-react";
import { HexColorPicker } from "react-colorful";

function App() {
  const [bulbSettings, setBulb] = useState({
    isOn: false,
    color: "#ffcc00",
    brightness: 0,
  });

  const [selectedId, setSelectedId] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [tempColor, setTempColor] = useState("#ffffff");

  const [tempId, setTempId] = useState(null);

  const initialScenes = [
    {
      id: "scene-1",
      name: "Daylight",
      color: "#eef5ffff",
      brightness: 90,
      icon: Sun,
    },
    {
      id: "scene-2",
      name: "Night Light",
      color: "#ffffff50",
      brightness: 30,
      icon: Moon,
    },
    {
      id: "scene-3",
      name: "Romance",
      color: "#6600ffff",
      brightness: 70,
      icon: Heart,
    },
    {
      id: "scene-4",
      name: "Tv Time",
      color: "#0059ffff",
      brightness: 100,
      icon: Tv2,
    },
    {
      id: "scene-5",
      name: "Study",
      color: "#ccff99ff",
      brightness: 80,
      icon: BookMarked,
    },
    {
      id: "scene-6",
      name: "Relax",
      color: "#ff9966ff",
      brightness: 50,
      icon: Sofa,
    },
  ];
  const [scenes, setScenes] = useState(initialScenes);

  const initialColors = [
    {
      id: "color-1",
      color: "#ff0000",
      brightness: 60,
      backgroundColor: "#ff0000",
    },
    {
      id: "color-2",
      color: "#00ff00",
      brightness: 60,
      backgroundColor: "#00ff00",
    },
    {
      id: "color-3",
      color: "#0000ff",
      brightness: 60,
      backgroundColor: "#0000ff",
    },
    {
      id: "color-4",
      color: "#ffff00",
      brightness: 60,
      backgroundColor: "#ffff00",
    },
    {
      id: "color-5",
      color: "#ff00ff",
      brightness: 60,
      backgroundColor: "#ff00ff",
    },
    {
      id: "color-6",
      color: "#00ffff",
      brightness: 60,
      backgroundColor: "#00ffff",
    },
  ];
  const [colors, setColors] = useState(initialColors);

  const handleItemSelection = (item) => {
    setSelectedId(item.id);
    handleSceneChange(item);
  };

  const handleSceneChange = (scene) => {
    setBulb(() => ({
      isOn: true,
      color: scene.color,
      brightness: scene.brightness,
    }));
  };

  const handleColorChange = (color) => {
    setBulb((prev) => ({ ...prev, color: color, isOn: true }));
  };

  const handleBrightnessChange = (e) => {
    const newValue = e.target.value;
    if (newValue == 0) setBulb({ ...bulbSettings, isOn: false, brightness: 0 });
    else setBulb({ ...bulbSettings, isOn: true, brightness: newValue });
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setTempColor(item.color);
    setTempId(item.id);
    setIsEditOpen(true);
  };

  const handleSave = () => {
    let updatedColors = colors.map((s) =>
      s.id === editingItem.id
        ? { ...s, color: tempColor, backgroundColor: tempColor }
        : s
    );

    setColors(updatedColors);
    handleColorChange(tempColor);
    setSelectedId(tempId);
    setIsEditOpen(false);
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
          onItemClick={handleItemSelection}
          selectedId={selectedId}
        />

        <Card
          title="Colors"
          content={colors}
          onItemClick={handleItemSelection}
          onEditClick={handleEditClick}
          customClass="editable"
          selectedId={selectedId}
        />
      </div>

      {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="custom-picker">
              <HexColorPicker color={tempColor} onChange={setTempColor} />
            </div>

            <div className="modal-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditOpen(false);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="submit-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
