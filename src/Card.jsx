function Card({ title, content, onItemClick, customClass }) {
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
