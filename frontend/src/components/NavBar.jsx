import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-brand">
        <span className="nav-logo">🕸️</span>
        <span className="nav-title">KeepinTrack</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Routine
        </NavLink>
        <NavLink to="/daily" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Today
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          History
        </NavLink>
      </div>
    </nav>
  );
}
