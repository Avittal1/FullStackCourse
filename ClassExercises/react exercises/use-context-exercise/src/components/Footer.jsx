import { useTheme } from "../context/ThemeContext";

const THEME_LABELS = {
  light: "Light",
  dark: "Dark",
  "high-contrast": "High Contrast",
};

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="app-footer">
      <p>Theme: {THEME_LABELS[theme] ?? theme}</p>
    </footer>
  );
}