import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  ["/", "Home"],
  ["/menu", "Menu"],
  ["/gallery", "Gallery"],
  ["/reservations", "Reservations"],
  ["/about", "About Us"],
  ["/contact", "Contact Us"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={close}>
        <span className="brand-mark" aria-hidden="true">CF</span>
        <span>
          <strong>Café Fausse</strong>
          <small>French cooking for every generation</small>
        </span>
      </Link>

      <button
        className="mobile-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "☰"}
      </button>

      <nav id="main-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Main">
        {navItems.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={close}>
            {label}
          </NavLink>
        ))}
        <Link to="/reservations" className="btn btn-primary nav-cta" onClick={close}>
          Book a table
        </Link>
      </nav>
    </header>
  );
}
