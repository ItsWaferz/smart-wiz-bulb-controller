import { useState } from "react";

function Timer({ isOpen, time, updateTime }) {
  const [isClosing, setIsClosing] = useState(false);

  // Corecție: Folosim Math.floor pentru a evita numerele cu virgulă
  const [hours, setHours] = useState(Math.floor(time / 3600));
  const [minutes, setMinutes] = useState(Math.floor((time % 3600) / 60));
  const [seconds, setSeconds] = useState(time % 60);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      isOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // O funcție de formatare mai simplă și sigură
  const formatDisplay = (val) => {
    return val.toString().padStart(2, "0");
  };

  // Gestionăm schimbarea valorii cu limitare la 2 cifre și validare numerică
  const handleInputChange = (e, setter, max) => {
    let val = e.target.value;

    // Luăm doar ultimele 2 cifre introduse
    if (val.length > 2) val = val.slice(-2);

    const num = parseInt(val) || 0; // Prevenim NaN

    if (num <= max) {
      setter(num);
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
        <div className="timer-display">
          <input
            inputMode="numeric"
            type="text" // Text e mai stabil pentru cursor positioning
            onFocus={(e) => e.target.select()} // Mai simplu: selectează tot la focus
            value={formatDisplay(hours)}
            onChange={(e) => handleInputChange(e, setHours, 24)}
            style={{ color: hours > 0 ? "aliceblue" : "gray" }}
          />
          <span style={{ color: hours > 0 ? "aliceblue" : "gray" }}>:</span>

          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={formatDisplay(minutes)}
            onChange={(e) => handleInputChange(e, setMinutes, 59)}
          />
          <span>:</span>

          <input
            inputMode="numeric"
            type="text"
            onFocus={(e) => e.target.select()}
            value={formatDisplay(seconds)}
            onChange={(e) => handleInputChange(e, setSeconds, 59)}
          />
        </div>

        <div className="modal-actions">
          <button onClick={closeModal} className="cancel-btn">
            Cancel
          </button>

          <button
            onClick={() => {
              // Convertim totul înapoi în secunde totale
              const totalSeconds = hours * 3600 + minutes * 60 + seconds;
              updateTime(totalSeconds);
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

export default Timer;
