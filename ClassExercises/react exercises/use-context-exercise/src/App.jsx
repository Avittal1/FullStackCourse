import { createContext, useContext, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./App.css";

// --- Part 1A: Prop Drilling version ---
function UserNameProps({ userName }) {
  return <span className="user-badge">User (Props): {userName}</span>;
}

function UserGreetingProps({ userName }) {
  return <p className="user-greeting">Welcome back, {userName}!</p>;
}

function UserProfileProps({ userName }) {
  return (
    <div className="middle-box">
      <UserGreetingProps userName={userName} />
      <UserNameProps userName={userName} />
    </div>
  );
}

// --- Part 1B: Context version ---
const UserContext = createContext("Alice");

function UserNameContext() {
  const userName = useContext(UserContext);
  return <span className="user-badge">User (Context): {userName}</span>;
}

function UserGreetingContext() {
  const userName = useContext(UserContext);
  return <p className="user-greeting">Hello again, {userName}!</p>;
}

function UserProfileContext() {
  return (
    <div className="middle-box">
      <UserGreetingContext />
      <UserNameContext />
    </div>
  );
}

function UserSection() {
  const { theme } = useTheme();
  const [userName] = useState("Alice");

  return (
    <section className={`user-panel user-panel--${theme}`}>
      <h2>Part 1: User Name Context</h2>
      <div className="part1-grid">
        <div className="part1-column">
          <h3>With Props</h3>
          <UserProfileProps userName={userName} />
        </div>
        <UserContext.Provider value={userName}>
          <div className="part1-column">
            <h3>With useContext</h3>
            <UserProfileContext />
          </div>
        </UserContext.Provider>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <Header title="useContext Exercise" />
        <main className="app-main">
          <UserSection />
          <Content />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}