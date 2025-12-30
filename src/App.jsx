import { useEffect, useState } from "react";
import Bulb from "./Bulb";
import Card from "./Card";
import Toggle from "./Toggle";
import ColorPicker from "./ColorPicker";
import Timer from "./Timer";
import { Sun, Heart, Moon, Tv2, Sofa, BookMarked } from "lucide-react";
import { HexColorPicker } from "react-colorful";

function App() {
  const [bulbSettings, setBulb] = useState({
    isOn: true,
    color: "#ffcc00",
    brightness: 100,
  });

  const [selectedId, setSelectedId] = useState(null);

  const [isColorEditOpen, setIsColorEditOpen] = useState(false);
  const [isRoutineColorEditOpen, setIsRoutineColorEditOpen] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [tempColor, setTempColor] = useState("#ffffff");

  const [tempId, setTempId] = useState(null);

  const [isClosing, setIsClosing] = useState(false);

  const [isRoutineActive, setIsRoutineActive] = useState(true);
  const [isRoutineEditOpen, setIsRoutineEditOpen] = useState(false);
  const [routineText, setRoutineText] = useState("Circadian");

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerEditOpen, setIsTimerEditOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [lastTime, setLastTime] = useState(300);

  const [colorPickerStatus, setColorPickerStatus] = useState("colors");

  const [kelvin, setKelvin] = useState(4000);

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

  const initialRoutine = [
    {
      id: "routine-1",
      startTime: "06:30",
      endTime: "10:00",
      color: "#fff9df47",
      brightness: 20,
    },
    {
      id: "routine-2",
      startTime: "10:00",
      endTime: "13:00",
      color: "#a7b0ffdd",
      brightness: 80,
    },
    {
      id: "routine-3",
      startTime: "13:00",
      endTime: "21:30",
      color: "#ffba5fdd",
      brightness: 60,
    },
    {
      id: "routine-4",
      startTime: "21:30",
      endTime: "01:30",
      color: "#d3d3d3aa",
      brightness: 30,
    },
    {
      id: "routine-5",
      startTime: "01:30",
      endTime: "06:30",
      color: "rgba(128, 128, 128, 0.49)",
      brightness: 10,
    },
  ];
  const [routine, setRoutine] = useState(initialRoutine);
  const [tempRoutine, setTempRoutine] = useState(routine);
  const formatTime = (seconds) => {
    seconds = parseInt(seconds);
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor(seconds / 60 - hours * 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours != "00" ? hours + ":" : ""}${mins}:${secs}`;
  };

  const isTimeInInterval = (now, start, end) => {
    console.log(now, start, end);
    if (start > end) return start <= now || now < end;
    return start <= now && now < end;
  };

  useEffect(() => {
    const checkRoutine = () => {
      if (!isRoutineActive) return;

      const now = new Date();
      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      const activeRoutine = routine.find((item) =>
        isTimeInInterval(currentTime, item.startTime, item.endTime)
      );

      if (activeRoutine) {
        setBulb((prev) => ({
          ...prev,
          color: activeRoutine.color,
          brightness: activeRoutine.brightness,
          isOn: true,
        }));
      }
    };

    checkRoutine();

    const interval = setInterval(checkRoutine, 60000);

    return () => clearInterval(interval);
  }, [isRoutineActive, routine]);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
      handleBulb();
      setTimeLeft(lastTime);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsRoutineEditOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBulb = () => {
    if (bulbSettings.isOn) {
      setIsTimerActive(false);
      setTimeLeft(lastTime);
      setIsRoutineActive(false);
    }
    setBulb((prev) => ({ ...prev, isOn: !prev.isOn }));
  };

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
    setIsRoutineActive(false);
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
    setIsColorEditOpen(true);
  };

  const handleRoutineEditClick = (item) => {
    setEditingItem(item);
    setTempColor(item.color);
    setTempId(item.id);
    setIsRoutineColorEditOpen(true);
  };

  const handleRoutineEdit = () => {
    setIsRoutineEditOpen(true);
  };

  const handleTimer = () => {
    if (isTimerActive) {
      setIsTimerActive(false);
      setTimeLeft(lastTime);
    } else {
      setBulb((prev) => ({ ...prev, isOn: true }));
      setIsTimerActive(true);
    }
  };

  return (
    <div className="app">
      <Bulb settings={bulbSettings} onToggle={handleBulb} />

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
        <Toggle
          title="Routine"
          subTitle={routineText}
          onToggle={setIsRoutineActive}
          toggle={isRoutineActive}
          onEditClick={handleRoutineEdit}
        />

        <Toggle
          title="Timer"
          subTitle={formatTime(timeLeft)}
          onToggle={handleTimer}
          toggle={isTimerActive}
          onEditClick={() => {
            setIsTimerEditOpen(true);
          }}
        />
      </div>

      {isColorEditOpen && (
        <ColorPicker
          tempColor={tempColor}
          elements={colors}
          isOpen={setIsColorEditOpen}
          setElements={setColors}
          handleColorChange={handleColorChange}
          setSelectedId={setSelectedId}
          tempId={tempId}
          updateBulb={true}
        />
      )}

      {isRoutineColorEditOpen && (
        <ColorPicker
          tempColor={tempColor}
          elements={tempRoutine}
          isOpen={setIsRoutineColorEditOpen}
          setElements={setTempRoutine}
          handleColorChange={handleColorChange}
          setSelectedId={setSelectedId}
          tempId={tempId}
          updateBulb={false}
        />
      )}

      {isRoutineEditOpen && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={() => closeModal()}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ul className="rotuine-list">
              {tempRoutine.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => handleRoutineEditClick(r)}
                    style={{
                      backgroundColor: r.color,
                    }}
                    className="routine-btn"
                  ></button>
                  <div className="routine-time">
                    {r.startTime} - {r.endTime}
                  </div>
                </li>
              ))}
            </ul>

            <div className="modal-actions">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setTempRoutine(routine);

                  closeModal();
                }}
                className="cancel-btn"
              >
                Cancel
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setRoutine(tempRoutine);

                  closeModal();
                }}
                className="submit-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isTimerEditOpen && (
        <Timer
          isOpen={setIsTimerEditOpen}
          time={lastTime}
          updateTime={(time) => {
            setTimeLeft(time);
            setLastTime(time);
          }}
        />
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
