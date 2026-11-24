import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="cards-grid">
        <ProfileCard
          avatar="https://i.pravatar.cc/150?img=32"
          name="Noa Levi"
          description="Frontend developer who loves clean UI and coffee."
          type="Friend"
        />
        <ProfileCard
          avatar="https://i.pravatar.cc/150?img=11"
          name="Itamar Mizrahi"
          description="FullStack instructor teaching React and modern web."
          type="Teacher"
        />
        <ProfileCard
          avatar="https://i.pravatar.cc/150?img=47"
          name="Maya Cohen"
          description="Computer Science student building her first React app."
          type="Student"
        />
      </main>

      <Footer />
    </div>
  );
}