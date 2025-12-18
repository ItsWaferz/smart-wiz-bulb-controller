function Bulb({ settings, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="bulb"
      style={{
        width: "120px",
        height: "120px",
        backgroundColor: settings.isOn ? settings.color : "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
        borderRadius: 20,
        transition: "0.3s ease",
        boxShadow: settings.isOn ? `0px 0px 40px ${settings.color}` : "none",
      }}
    >
      {settings.isOn ? "ON" : "OFF"}
    </div>
  );
}

export default Bulb;
