import { Link } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import usePageTitle from "../components/usePageTitle";
import { images } from "../data/site";

const occasions = [
  { icon: "👨‍👩‍👧", title: "Family meals", text: "High chairs, a children's menu and crayons on the table. Early tables from 5:30 PM suit little ones perfectly." },
  { icon: "🎂", title: "Birthdays & celebrations", text: "Tell us when you book and we'll bring out a candle-topped dessert and a song if you'd like one." },
  { icon: "🕯️", title: "Date nights", text: "Cosy corner tables, soft lighting and a wine list our sommelier is always happy to talk through." },
  { icon: "🥂", title: "Friends & gatherings", text: "Sharing plates and long tables for catching up, from graduation dinners to reunions." },
];

const reviews = [
  { quote: "Our granddaughter ordered the crêpe and is still talking about it. The staff made all three generations feel at home.", name: "Margaret, 71" },
  { quote: "Fancy enough for an anniversary, relaxed enough that we didn't feel out of place in jeans.", name: "Jordan & Sam, 29" },
  { quote: "I loved the hot chocolate and they let me crack the crème brûlée myself!", name: "Leo, 9" },
];

export default function Home() {
  usePageTitle();

  return (
    <>
      <section className="hero" style={{ "--hero-image": `url(${images.diningRoom})` }}>
        <div className="hero-content">
          <p className="eyebrow">Welcome to Café Fausse</p>
          <h1>A table for everyone.</h1>
          <p className="hero-copy">
            Classic French cooking made with fresh, local ingredients, served by people who are genuinely
            glad you came. Bring the kids, bring your parents, bring your best friend.
          </p>
          <div className="hero-actions">
            <Link to="/reservations" className="btn btn-gold">Book a table</Link>
            <Link to="/menu" className="btn btn-light">See the menu</Link>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="eyebrow">Our promise</p>
          <h2>Fine food without the fuss.</h2>
        </div>
        <div>
          <p>
            You don't need to know your sauce béarnaise from your beurre blanc to have a wonderful evening here.
            Our team will happily explain any dish, suggest something for picky eaters and adjust recipes for
            allergies.
          </p>
          <ul className="check-list">
            <li>Step-free entrance and accessible restrooms</li>
            <li>Large-print menus and quiet tables on request</li>
            <li>Vegetarian and gluten-free options on every course</li>
          </ul>
          <Link to="/about" className="text-link">Meet the family behind Café Fausse →</Link>
        </div>
      </section>

      <section className="section occasions" aria-labelledby="occasions-title">
        <div className="section-heading">
          <p className="eyebrow">Something for every occasion</p>
          <h2 id="occasions-title">Who's coming to dinner?</h2>
        </div>
        <div className="card-grid">
          {occasions.map((item) => (
            <article className="card" key={item.title}>
              <span className="card-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card" style={{ "--feature-image": `url(${images.plated})` }}>
          <p className="eyebrow">The menu</p>
          <h3>Familiar favourites, done beautifully.</h3>
          <p>From steak frites to a build-your-own crêpe, there's a dish for every appetite.</p>
          <Link to="/menu" className="btn btn-light">Browse the menu</Link>
        </article>
        <article className="feature-card" style={{ "--feature-image": `url(${images.interior})` }}>
          <p className="eyebrow">The dining room</p>
          <h3>Warm, bright and welcoming.</h3>
          <p>Take a peek inside before you visit, from the cosy bar to the open kitchen.</p>
          <Link to="/gallery" className="btn btn-light">View the gallery</Link>
        </article>
      </section>

      <section className="section reviews" aria-labelledby="reviews-title">
        <div className="section-heading">
          <p className="eyebrow">Kind words</p>
          <h2 id="reviews-title">Loved by guests aged 9 to 90.</h2>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <figure className="review" key={review.name}>
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption>{review.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="awards-line">
          <strong>Best Fine Dining Experience 2025</strong> · Metropolitan Dining Awards ·
          <strong> 4.9 / 5</strong> from 1,200+ guests
        </p>
      </section>

      <Newsletter />
    </>
  );
}
