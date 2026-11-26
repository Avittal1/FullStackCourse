import { useTheme } from "../context/ThemeContext";
import ThemedButton from "./ThemedButton";

export default function Header({ title = "useContext Demo" }) {
  const { toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <h1>{title}</h1>
      <ThemedButton onClick={toggleTheme}>Toggle Theme</ThemedButton>
    </header>
  );
}