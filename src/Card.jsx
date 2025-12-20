import { Pencil } from "lucide-react";

function Card({ content, onItemClick, customClass }) {
  return (
    <div className={`card ${customClass}`}>
      <ul className="card-content">
        {content.map((item) => (
          <li
            style={{
              backgroundColor: item.backgroundColor,
            }}
            key={item.id}
            onClick={() => onItemClick(item)}
          >
            {item.icon && <item.icon className="card-icon" />}
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(item.id);
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
