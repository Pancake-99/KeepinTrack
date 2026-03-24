import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AltitudeBanner from './components/AltitudeBanner';
import Targets from './components/Targets';
import Schedule from './components/Schedule';
import ProgressionSection from './components/ProgressionSection';
import DailyTracker from './pages/DailyTracker';
import History from './pages/History';
import { footerNotes } from './data/routineData';

function HomePage() {
  return (
    <div className="wrap">
      <Hero />
      <AltitudeBanner />
      <Targets />
      <Schedule />
      <ProgressionSection />

      <div className="footer-strip">
        <div className="footer-note">{footerNotes[0]}</div>
        <div className="footer-note">
          <span className="footer-red">{footerNotes[1].red}</span>
          {footerNotes[1].main}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daily" element={<DailyTracker />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
