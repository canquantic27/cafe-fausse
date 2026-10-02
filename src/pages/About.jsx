import { Link } from "react-router-dom";
import usePageTitle from "../components/usePageTitle";
import { images } from "../data/site";

const values = [
  { title: "Fresh and local", text: "We buy from farms and fishermen within a day's drive, and the menu changes with the seasons." },
  { title: "Everyone's welcome", text: "Toddlers, teenagers, grandparents, first dates and fiftieth anniversaries. There's room for all." },
  { title: "Cooked with care", text: "Classic French technique, no shortcuts, and every recipe tasted by our whole team before it goes on the menu." },
];

const team = [
  { initials: "EL", name: "Elise Laurent", role: "Head Chef & Co-Founder", bio: "Grew up cooking Sunday lunch for twelve in her grandmother's kitchen in Lyon. That same spirit is in every plate she sends out." },
  { initials: "MD", name: "Marc Delacroix", role: "Co-Founder & Sommelier", bio: "Loves finding the perfect glass for any dish, and makes a mean lavender lemonade for guests who don't drink." },
];

export default function About() {
  usePageTitle("About Us");

  return (
    <>
      <section className="page-section about-page">
        <div className="about-image" style={{ "--side-image": `url(${images.team})` }} role="img" aria-label="Our team preparing the dining room" />
        <div className="about-content">
          <p className="eyebrow">Our story</p>
          <h1>Like dinner at a French friend's house.</h1>
          <p className="lead">
            Café Fausse opened with a simple idea: wonderful food shouldn't feel stiff or exclusive. It should feel
            like being welcomed into someone's home.
          </p>
          <p>
            Chef Elise Laurent and restaurateur Marc Delacroix met while working in Paris and dreamed of a place
            where a grandmother celebrating her 80th and a family with a new baby could sit side by side and
            both feel at home. Today, we bring the warmth of a French family table to the heart of New York.
          </p>
        </div>
      </section>

      <section className="section values" aria-labelledby="values-title">
        <div className="section-heading">
          <p className="eyebrow">What matters to us</p>
          <h2 id="values-title">Three things we never compromise on</h2>
        </div>
        <div className="card-grid three">
          {values.map((value) => (
            <article className="card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <div className="section-heading">
          <p className="eyebrow">The people</p>
          <h2 id="team-title">Meet our founders</h2>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article className="person" key={person.name}>
              <span className="avatar" aria-hidden="true">{person.initials}</span>
              <div>
                <h3>{person.name}</h3>
                <p className="role">{person.role}</p>
                <p>{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="center">
          <Link to="/reservations" className="btn btn-primary">Come and say hello</Link>
        </div>
      </section>
    </>
  );
}
