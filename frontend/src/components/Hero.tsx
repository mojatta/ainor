import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tagline">#1 Voice AI for Restaurants</span>
            <h1 className="hero-headline">Turn Calls & Chats Into Reservations — Automatically</h1>
            <p className="hero-description">
              AINOR answers every guest call or message instantly, 24/7 — helping restaurants increase revenue and reduce staff workload.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-large">Try AINOR</button>
              <button className="btn-secondary-large">Book a Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <div className="chat-bubble chat-bubble-1">
                  <span>Hi, can I book for 5 at 7pm?</span>
                </div>
                <div className="chat-bubble chat-bubble-2">
                  <span>We have availability, let me get your details.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

