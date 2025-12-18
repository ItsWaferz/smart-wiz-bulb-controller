function Card({ title, content, onItemClick }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <ul className="card-content">
        {content.map((item) => (
          <li key={item.id} onClick={() => onItemClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
