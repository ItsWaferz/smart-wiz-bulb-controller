import { Pencil } from "lucide-react";

function Toggle({ title, subTitle, onToggle, toggle, onEditClick }) {
  return (
    <div
      style={{
        backgroundColor: toggle ? "rgb(70, 103, 140)" : "rgb(32, 50, 73)",
        transition: "0.3s ease",
        boxShadow: toggle ? "0px 0px 10px rgba(70, 103, 140, 0.8)" : "none",
      }}
      onClick={() => onToggle(!toggle)}
      className="menu"
    >
      <h2>{title}</h2>
      <p>{subTitle}</p>
      <button
        style={{
          backgroundColor: toggle ? "rgb(32, 50, 73)" : "rgb(70, 103, 140)",
          transition: "0.3s ease",
        }}
        onClick={onEditClick}
        className="routine edit-btn"
      >
        <Pencil className="edit-btn-icon" />
      </button>
    </div>
  );
}

export default Toggle;
