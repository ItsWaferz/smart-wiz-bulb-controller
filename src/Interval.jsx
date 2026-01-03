import { useState } from "react";

function Interval({ startTime, endTime, isOpen, handleSave }) {
  const [isClosing, setIsClosing] = useState(false);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      isOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const [startMinutes, setStartMinutes] = useState(startTime.slice(3, 5));
  const [startHours, setStartHours] = useState(startTime.slice(0, 2));
  const [endMinutes, setEndMinutes] = useState(endTime.slice(3, 5));
  const [endHours, setEndHours] = useState(endTime.slice(0, 2));

  const handleTimeChange = (e, setter, max) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(-2);

    const num = parseInt(value) || "00";

    if (num < max) {
      setter(num.toString().padStart(2, "0"));
    } else {
      setter(max);
    }
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      style={{ zIndex: 2000 }}
      onClick={closeModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ marginBottom: "2dvh" }} className="timer-display">
          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={startHours}
            onChange={(e) => handleTimeChange(e, setStartHours, "23")}
          />
          <span>:</span>

          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={startMinutes}
            onChange={(e) => handleTimeChange(e, setStartMinutes, "59")}
          />
        </div>
        <div className="timer-display">
          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={endHours}
            onChange={(e) => handleTimeChange(e, setEndHours, "23")}
          />
          <span>:</span>

          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={endMinutes}
            onChange={(e) => handleTimeChange(e, setEndMinutes, "59")}
          />
        </div>
        <div className="modal-actions">
          <button onClick={closeModal} className="cancel-btn">
            Cancel
          </button>

          <button
            onClick={() => {
              handleSave(
                startHours + ":" + startMinutes,
                endHours + ":" + endMinutes
              );
              closeModal();
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

export default Interval;
