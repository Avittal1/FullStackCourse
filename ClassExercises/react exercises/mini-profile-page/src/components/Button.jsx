export default function Button({ type, label = "View Profile" }) {
  // הפיכת הסוג לאותיות קטנות כדי להתאים לשם הקלאס ב-CSS (למשל: btn-friend)
  const typeClass = `btn-${type.toLowerCase()}`;

  return (
    <button className={`btn ${typeClass}`}>
      {label}
    </button>
  );
}