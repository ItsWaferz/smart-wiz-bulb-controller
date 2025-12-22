import { Pencil } from "lucide-react";

function Card({ content, onItemClick, onEditClick, customClass, selectedId }) {
  return (
    <div className={`card ${customClass}`}>
      <ul className="card-content">
        {content.map((item) => (
          <li
            className={`${
              selectedId === item.id ? "selected" : "not-selected"
            }`}
            style={{
              backgroundColor: item.backgroundColor,
            }}
            key={item.id}
            onClick={() => {
              onItemClick(item);
            }}
          >
            {item.icon && <item.icon className="card-icon" />}
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(item);
              }}
            >
              <Pencil className="edit-btn-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
