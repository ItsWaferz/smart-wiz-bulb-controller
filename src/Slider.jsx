function Slider({ value, onChange, style }) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      style={style}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="brightness-slider"
    />
  );
}

export default Slider;
