import { useState } from "react";
import { HexColorPicker } from "react-colorful";

function ColorPicker({
  tempColor,
  elements,
  isOpen,
  setElements,
  handleColorChange,
  setSelectedId,
  tempId,
  updateBulb,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [colorPickerStatus, setColorPickerStatus] = useState("colors");
  const [kelvin, setKelvin] = useState(4000);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      isOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleTempChange = (e) => {
    setKelvin(e.target.value);
  };

  const handleSave = () => {
    let whiteTemp = "";
    if (colorPickerStatus == "whites") {
      if (kelvin <= 4000) whiteTemp = "#ffd979ff";
      else if (kelvin >= 5500) whiteTemp = "#85b8ffff";
      else whiteTemp = "#ffffff";
    }
    const updatedColors = elements.map((s) =>
      s.id == tempId
        ? {
            ...s,
            color: colorPickerStatus == "whites" ? whiteTemp : tempColor,
            backgroundColor:
              colorPickerStatus == "whites" ? whiteTemp : tempColor,
          }
        : s
    );

    setElements(updatedColors);
    if (updateBulb) handleColorChange(tempColor);
    setSelectedId(tempId);

    closeModal();
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      style={{ zIndex: 2000 }}
      onClick={() => closeModal()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="color-type">
          <button
            style={{
              backgroundColor:
                colorPickerStatus == "colors"
                  ? "rgb(70, 103, 140)"
                  : "rgb(32, 50, 73)",
            }}
            onClick={() => setColorPickerStatus("colors")}
            className="colors-btn"
          >
            Colors
          </button>
          <button
            style={{
              backgroundColor:
                colorPickerStatus == "whites"
                  ? "rgb(70, 103, 140)"
                  : "rgb(32, 50, 73)",
            }}
            onClick={() => setColorPickerStatus("whites")}
            className="whites-btn"
          >
            Whites
          </button>
        </div>
        {colorPickerStatus == "colors" ? (
          <div className="custom-picker">
            <HexColorPicker
              color={tempColor}
              onChange={(c) => {
                tempColor = c;
              }}
            />
          </div>
        ) : (
          <div className="kelvin-color-picker">
            <h2>Temperature: {kelvin}</h2>
            <input
              type="range"
              min="2500"
              max="6500"
              value={kelvin}
              onChange={handleTempChange}
              className="kelvin-slider"
            ></input>
          </div>
        )}
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

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

              handleSave();
            }}
            className="submit-btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
