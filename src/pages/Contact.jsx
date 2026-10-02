import { useState } from "react";
import PageHeading from "../components/PageHeading";
import usePageTitle from "../components/usePageTitle";
import { site } from "../data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const topics = ["General question", "Private event or party", "Feedback", "Gift vouchers", "Accessibility", "Something else"];

const faqs = [
  { q: "Are children welcome?", a: "Always! We have high chairs, booster seats, a Little Gourmets menu and crayons at every family table." },
  { q: "Is there a dress code?", a: "Come as you are. Smart-casual is typical, but jeans and trainers are absolutely fine." },
  { q: "Can you cater for allergies?", a: "Yes. Tell us when you book and let your server know. Our chefs can adapt most dishes." },
  { q: "Is the restaurant accessible?", a: "We have a step-free entrance, an accessible restroom and large-print menus. Let us know if you need anything else." },
];

const emptyForm = { name: "", email: "", topic: topics[0], message: "" };

export default function Contact() {
  usePageTitle("Contact Us");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!emailPattern.test(form.email)) next.email = "Please enter a valid email so we can reply.";
    if (form.message.trim().length < 10) next.message = "Please write a little more so we can help.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setForm(emptyForm);
    }
  };

  const field = (name) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: update,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorFor = (name) =>
    errors[name] && <span className="field-error" id={`contact-${name}-error`}>{errors[name]}</span>;

  const mapQuery = encodeURIComponent(`${site.address.join(", ")}`);

  return (
    <section className="page-section">
      <PageHeading eyebrow="Contact us" title="We'd love to hear from you">
        Questions, special requests or planning a party? Call, email or send us a note and a real person will
        get back to you within one day.
      </PageHeading>

      <div className="contact-cards">
        <article className="card">
          <span className="card-icon" aria-hidden="true">📞</span>
          <h2>Call us</h2>
          <p><a href={site.phoneHref}>{site.phone}</a></p>
          <p className="muted">Tuesday to Saturday, from 3 PM</p>
        </article>
        <article className="card">
          <span className="card-icon" aria-hidden="true">✉️</span>
          <h2>Email us</h2>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="muted">We reply within one day</p>
        </article>
        <article className="card">
          <span className="card-icon" aria-hidden="true">📍</span>
          <h2>Visit us</h2>
          <p>{site.address[0]}<br />{site.address[1]}</p>
          <p><a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Get directions ↗</a></p>
        </article>
      </div>

      <div className="contact-layout">
        <div>
          <h2>Send us a message</h2>
          {sent ? (
            <div className="confirmation" role="status">
              <span className="card-icon" aria-hidden="true">💌</span>
              <h3>Message sent. Thank you!</h3>
              <p>We'll be in touch soon. For anything urgent, please give us a call.</p>
              <button className="btn btn-outline" onClick={() => setSent(false)}>Send another message</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <label htmlFor="contact-name">Your name *</label>
              <input {...field("name")} autoComplete="name" />
              {errorFor("name")}

              <label htmlFor="contact-email">Email *</label>
              <input {...field("email")} type="email" autoComplete="email" />
              {errorFor("email")}

              <label htmlFor="contact-topic">What's it about?</label>
              <select {...field("topic")}>
                {topics.map((topic) => <option key={topic}>{topic}</option>)}
              </select>

              <label htmlFor="contact-message">Message *</label>
              <textarea {...field("message")} rows="5" />
              {errorFor("message")}

              <button className="btn btn-primary btn-block" type="submit">Send message</button>
            </form>
          )}
        </div>

        <div>
          <h2>Opening hours</h2>
          <ul className="hours-list large">
            {site.hours.map(([days, time]) => (
              <li key={days}><span>{days}</span><span>{time}</span></li>
            ))}
          </ul>

          <h2 className="faq-title">Questions we hear a lot</h2>
          <div className="faq">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
