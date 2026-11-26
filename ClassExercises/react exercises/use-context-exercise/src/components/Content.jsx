import { useTheme } from "../context/ThemeContext";
import ThemedButton from "./ThemedButton";

const CARDS = [
  {
    id: 1,
    title: "Skip Prop Drilling",
    description: "Middle components no longer forward props they do not use.",
  },
  {
    id: 2,
    title: "Global Theme State",
    description: "Light, dark, and high-contrast modes update together.",
  },
  {
    id: 3,
    title: "Persistent Choice",
    description: "Selected theme is saved automatically in localStorage.",
  },
];

export default function Content() {
  const { theme } = useTheme();

  return (
    <section className="content-section">
      <div className="cards-grid">
        {CARDS.map((card) => (
          <article key={card.id} className={`info-card info-card--${theme}`}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <ThemedButton onClick={() => {}}>Action</ThemedButton>
          </article>
        ))}
      </div>
    </section>
  );
}