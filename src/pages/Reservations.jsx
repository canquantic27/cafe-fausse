import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../components/usePageTitle";
import { images, site } from "../data/site";

const times = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];
const occasions = ["Just because", "Birthday", "Anniversary", "Family get-together", "Business meal", "Other celebration"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  occasion: "Just because",
  highChair: false,
  accessible: false,
  notes: "",
};

const today = () => new Date().toISOString().slice(0, 10);

export default function Reservations() {
  usePageTitle("Reservations");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!emailPattern.test(form.email)) next.email = "Please enter a valid email so we can confirm your booking.";
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < today()) next.date = "That date has already passed.";
    else if ([0, 1].includes(new Date(`${form.date}T12:00`).getDay())) next.date = "We're closed on Sundays and Mondays. Please pick another day.";
    if (!form.time) next.time = "Please choose a time.";
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) setConfirmed(form);
  };

  const field = (name) => ({
    id: `res-${name}`,
    name,
    value: form[name],
    onChange: update,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `res-${name}-error` : undefined,
  });

  const errorFor = (name) =>
    errors[name] && <span className="field-error" id={`res-${name}-error`}>{errors[name]}</span>;

  return (
    <section className="reservation-layout">
      <div className="reservation-image" style={{ "--side-image": `url(${images.tableSetting})` }}>
        <div>
          <p className="eyebrow">Reservations</p>
          <h1>We'll save you a seat.</h1>
          <p>We serve dinner Tuesday to Saturday from 5:30 PM. Early tables are perfect for families with little ones.</p>
          <p>Party of 7 or more? Call us on <a href={site.phoneHref}>{site.phone}</a> and we'll make it work.</p>
        </div>
      </div>

      <div className="reservation-form-wrap">
        {confirmed ? (
          <div className="confirmation" role="status">
            <span className="card-icon" aria-hidden="true">🎉</span>
            <h2>Thank you, {confirmed.name.split(" ")[0]}!</h2>
            <p>
              We've received your request for <strong>{confirmed.guests} {confirmed.guests === "1" ? "guest" : "guests"}</strong> on{" "}
              <strong>{new Date(`${confirmed.date}T12:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</strong>{" "}
              at <strong>{confirmed.time}</strong>. A confirmation will be sent to {confirmed.email}.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => { setConfirmed(null); setForm(emptyForm); }}>Make another booking</button>
              <Link to="/menu" className="btn btn-outline">Browse the menu</Link>
            </div>
          </div>
        ) : (
          <>
            <h2>Book your table</h2>
            <p className="lead">It only takes a minute. Fields marked * are required.</p>

            <form className="form" onSubmit={submit} noValidate>
              <label htmlFor="res-name">Full name *</label>
              <input {...field("name")} autoComplete="name" />
              {errorFor("name")}

              <div className="two-columns">
                <div>
                  <label htmlFor="res-email">Email *</label>
                  <input {...field("email")} type="email" autoComplete="email" />
                  {errorFor("email")}
                </div>
                <div>
                  <label htmlFor="res-phone">Phone <span className="optional">(optional)</span></label>
                  <input {...field("phone")} type="tel" autoComplete="tel" />
                </div>
              </div>

              <div className="two-columns">
                <div>
                  <label htmlFor="res-date">Date *</label>
                  <input {...field("date")} type="date" min={today()} />
                  {errorFor("date")}
                </div>
                <div>
                  <label htmlFor="res-time">Time *</label>
                  <select {...field("time")}>
                    <option value="">Choose a time</option>
                    {times.map((time) => <option key={time}>{time}</option>)}
                  </select>
                  {errorFor("time")}
                </div>
              </div>

              <div className="two-columns">
                <div>
                  <label htmlFor="res-guests">Number of guests *</label>
                  <select {...field("guests")}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="res-occasion">Occasion</label>
                  <select {...field("occasion")}>
                    {occasions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <fieldset className="checkbox-group">
                <legend>Anything we can prepare?</legend>
                <label className="checkbox">
                  <input type="checkbox" name="highChair" checked={form.highChair} onChange={update} />
                  We'll need a high chair or booster seat
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="accessible" checked={form.accessible} onChange={update} />
                  Step-free or wheelchair-friendly table, please
                </label>
              </fieldset>

              <label htmlFor="res-notes">Special requests <span className="optional">(optional)</span></label>
              <textarea {...field("notes")} rows="3" placeholder="Allergies, a quiet table, a birthday surprise…" />

              <button className="btn btn-primary btn-block" type="submit">Request my table</button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
