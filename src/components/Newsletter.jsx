import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const signUp = (event) => {
    event.preventDefault();
    if (!emailPattern.test(email)) {
      setStatus({ ok: false, text: "That email doesn't look quite right. Please check it and try again." });
      return;
    }
    setStatus({ ok: true, text: "You're on the list! Look out for seasonal menus and family events in your inbox." });
    setEmail("");
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div>
        <p className="eyebrow">Stay in touch</p>
        <h2 id="newsletter-title">Get news from our kitchen</h2>
        <p>New dishes, cooking classes for kids and grown-ups, holiday menus and special offers. About once a month, never spam.</p>
      </div>
      <form onSubmit={signUp} noValidate>
        <label htmlFor="newsletter-email">Your email address</label>
        <div className="inline-field">
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
          />
          <button type="submit" className="btn btn-gold">Sign me up</button>
        </div>
        {status && (
          <p className={status.ok ? "form-message success" : "form-message error"} role="status">
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}
