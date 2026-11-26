import { useTheme } from "../context/ThemeContext";

export default function ThemedButton({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  const { theme } = useTheme();

  return (
    <button
      type={type}
      onClick={onClick}
      className={`themed-btn themed-btn--${theme} ${className}`.trim()}
    >
      {children}
    </button>
  );
}