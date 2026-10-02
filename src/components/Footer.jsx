import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">CF</span>
        <div>
          <strong>Café Fausse</strong>
          <p>Good food, warm welcomes and a seat for everyone, from high chairs to the head of the table.</p>
        </div>
      </div>

      <div>
        <h2>Visit us</h2>
        <p>{site.address[0]}<br />{site.address[1]}</p>
        <p><a href={site.phoneHref}>{site.phone}</a><br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>

      <div>
        <h2>Opening hours</h2>
        <ul className="hours-list">
          {site.hours.map(([days, time]) => (
            <li key={days}><span>{days}</span><span>{time}</span></li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Explore</h2>
        <ul className="footer-links">
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>

      <p className="footer-bottom">© {new Date().getFullYear()} Café Fausse. Made with love in New York.</p>
    </footer>
  );
}
