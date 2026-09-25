import { useState } from "react";
import "./index.css";

const menuItems = [
  {
    category: "Starters",
    name: "Seared Scallops",
    description: "Cauliflower purée, brown butter, pear, toasted hazelnuts",
    price: "$24",
  },
  {
    category: "Starters",
    name: "Wild Mushroom Velouté",
    description: "Truffle crema, brioche crumbs, chive oil",
    price: "$18",
  },
  {
    category: "Mains",
    name: "Filet de Bœuf",
    description: "Pommes anna, glazed carrots, red-wine jus",
    price: "$48",
  },
  {
    category: "Mains",
    name: "Butter-Poached Halibut",
    description: "Fennel confit, saffron nage, citrus herbs",
    price: "$42",
  },
  {
    category: "Mains",
    name: "Truffle Risotto",
    description: "Aged parmesan, wild mushrooms, black truffle",
    price: "$34",
  },
  {
    category: "Desserts",
    name: "Chocolate Marquise",
    description: "Salted caramel, cocoa nib, crème fraîche",
    price: "$15",
  },
  {
    category: "Desserts",
    name: "Vanilla Bean Crème Brûlée",
    description: "Seasonal berries, almond biscotti",
    price: "$14",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    alt: "Fine dining table setting",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    alt: "Elegant restaurant interior",
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85",
    alt: "Restaurant bar",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    alt: "Dining room",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    alt: "Plated fine dining dish",
  },
  {
    src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1000&q=85",
    alt: "Restaurant kitchen",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    ["home", "Home"],
    ["menu", "Menu"],
    ["reservations", "Reservations"],
    ["about", "About Us"],
    ["gallery", "Gallery"],
  ];

  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-mark">CF</span>
          <span>
            <strong>Café Fausse</strong>
            <small>Modern French Dining</small>
          </span>
        </button>

        <button
          className="mobile-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="header-reserve" onClick={() => navigate("reservations")}>
          Reserve a Table
        </button>
      </header>

      <main>
        {page === "home" && <Home navigate={navigate} />}
        {page === "menu" && <Menu />}
        {page === "reservations" && <Reservations />}
        {page === "about" && <About />}
        {page === "gallery" && (
          <Gallery
            images={galleryImages}
            onSelectImage={setSelectedImage}
          />
        )}
      </main>

      <Footer navigate={navigate} />

      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="image-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <p>{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">An evening, beautifully composed</p>
          <h1>French-inspired dining, <em>reimagined.</em></h1>
          <p className="hero-copy">
            Café Fausse brings seasonal ingredients, precise technique, and
            effortless hospitality together in the heart of the city.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => navigate("reservations")}>
              Reserve Your Table
            </button>
            <button className="btn btn-outline" onClick={() => navigate("menu")}>
              Explore the Menu
            </button>
          </div>
        </div>
        <div className="scroll-note">Scroll to discover ↓</div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow gold">The Café Fausse Experience</p>
          <h2>Where every course tells a story.</h2>
        </div>
        <div>
          <p>
            Our kitchen celebrates the quiet luxury of exceptional ingredients.
            Thoughtful, seasonal menus are paired with warm, intuitive service
            in an atmosphere designed for lingering.
          </p>
          <button className="text-link" onClick={() => navigate("about")}>
            Meet our story →
          </button>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card seasonal">
          <p className="eyebrow">The menu</p>
          <h3>Seasonal at its heart.</h3>
          <p>Our menus evolve with the market and the imagination of our chefs.</p>
          <button onClick={() => navigate("menu")}>View menu →</button>
        </article>

        <article className="feature-card dining">
          <p className="eyebrow">The dining room</p>
          <h3>Designed for connection.</h3>
          <p>Intimate tables, candlelight, and a little room to celebrate.</p>
          <button onClick={() => navigate("gallery")}>Explore gallery →</button>
        </article>
      </section>

      <section className="awards section">
        <p className="eyebrow gold">Recognition</p>
        <h2>Celebrated for a reason.</h2>
        <div className="award-list">
          <div><strong>★ ★ ★ ★ ★</strong><span>“A masterpiece of modern hospitality.”</span><small>— The City Table</small></div>
          <div><strong>2025</strong><span>Best Fine Dining Experience</span><small>— Metropolitan Dining Awards</small></div>
          <div><strong>4.9/5</strong><span>Guest satisfaction rating</span><small>— 1,200+ diners</small></div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Menu() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Starters", "Mains", "Desserts"];
  const displayedItems =
    category === "All" ? menuItems : menuItems.filter((item) => item.category === category);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow gold">À la carte</p>
        <h1>Our Menu</h1>
        <p>Seasonal ingredients, elevated by classic French technique.</p>
      </div>

      <div className="menu-tabs">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {displayedItems.map((item) => (
          <article className="menu-item" key={item.name}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>

      <p className="menu-note">
        Please notify your server of allergies or dietary requirements. A chef’s
        tasting menu is available nightly.
      </p>
    </section>
  );
}

function Reservations() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [message, setMessage] = useState("");

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitReservation = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.date || !form.time) {
      setMessage("Please complete all required fields.");
      return;
    }

    setMessage(
      `Thank you, ${form.name}. Your reservation request for ${form.guests} guest(s) has been received.`
    );
  };

  return (
    <section className="reservation-layout">
      <div className="reservation-image">
        <div>
          <p className="eyebrow">Join us</p>
          <h1>An exceptional evening awaits.</h1>
          <p>
            Dinner service Tuesday through Saturday, from 5:30 PM.
          </p>
        </div>
      </div>

      <div className="reservation-form-wrap">
        <p className="eyebrow gold">Reservations</p>
        <h2>Reserve a table</h2>
        <p>For parties of seven or more, please contact us directly.</p>

        <form className="reservation-form" onSubmit={submitReservation}>
          <label>
            Full name *
            <input name="name" value={form.name} onChange={updateForm} placeholder="Your name" />
          </label>

          <label>
            Email address *
            <input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" />
          </label>

          <label>
            Phone number <span>(optional)</span>
            <input name="phone" type="tel" value={form.phone} onChange={updateForm} placeholder="+1 555 000 0000" />
          </label>

          <div className="two-columns">
            <label>
              Date *
              <input name="date" type="date" value={form.date} onChange={updateForm} />
            </label>

            <label>
              Time *
              <select name="time" value={form.time} onChange={updateForm}>
                <option value="">Select time</option>
                <option>5:30 PM</option>
                <option>6:00 PM</option>
                <option>6:30 PM</option>
                <option>7:00 PM</option>
                <option>7:30 PM</option>
                <option>8:00 PM</option>
                <option>8:30 PM</option>
              </select>
            </label>
          </div>

          <label>
            Guests *
            <select name="guests" value={form.guests} onChange={updateForm}>
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </label>

          <button className="btn btn-dark" type="submit">Request Reservation</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-section about-page">
      <div className="about-image" />
      <div className="about-content">
        <p className="eyebrow gold">Our story</p>
        <h1>Made with purpose, served with heart.</h1>
        <p>
          Café Fausse began with a shared belief: that extraordinary dining
          should feel welcoming, never distant. Founded by chef Elise Laurent
          and restaurateur Marc Delacroix, our restaurant honors French
          tradition while embracing the flavors and producers of our city.
        </p>
        <p>
          Every detail—from the hand-selected wines to the final flourish on a
          plate—is an invitation to pause, connect, and savor the moment.
        </p>
        <div className="owners">
          <div>
            <span>EL</span>
            <p><strong>Elise Laurent</strong><br />Chef & Co-Founder</p>
          </div>
          <div>
            <span>MD</span>
            <p><strong>Marc Delacroix</strong><br />Co-Founder & Sommelier</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ images, onSelectImage }) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow gold">A glimpse inside</p>
        <h1>Gallery</h1>
        <p>Spaces, flavors, and moments from Café Fausse.</p>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            className={`gallery-item gallery-${index + 1}`}
            key={image.src}
            onClick={() => onSelectImage(image)}
          >
            <img src={image.src} alt={image.alt} />
            <span>View image</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const signUp = (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you—welcome to the Café Fausse table.");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">Stay in the know</p>
        <h2>Notes from our table.</h2>
        <p>Seasonal menus, special events, and stories from our kitchen.</p>
      </div>
      <form onSubmit={signUp}>
        <div className="newsletter-input">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
          />
          <button type="submit">Join</button>
        </div>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark">CF</span>
        <div><strong>Café Fausse</strong><small>Modern French Dining</small></div>
      </div>

      <div>
        <h4>Visit</h4>
        <p>18 Rue de la Lumière<br />New York, NY 10013</p>
        <p>+1 (212) 555-0148</p>
      </div>

      <div>
        <h4>Hours</h4>
        <p>Tue–Thu: 5:30–10:00 PM<br />Fri–Sat: 5:30–11:00 PM<br />Sun–Mon: Closed</p>
      </div>

      <div className="footer-links">
        <button onClick={() => navigate("reservations")}>Reservations</button>
        <button onClick={() => navigate("menu")}>Menu</button>
        <button onClick={() => navigate("gallery")}>Gallery</button>
      </div>
    </footer>
  );
}

export default App;
