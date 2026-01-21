import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tagline">#1 Stemme-AI for Restauranter</span>
            <h1 className="hero-headline">Gjør Anrop og Chat til Reservasjoner — Automatisk</h1>
            <p className="hero-description">
              AINOR svarer på hver gjestanrop eller melding umiddelbart, 24/7 — hjelper restauranter med å øke inntekter og redusere personalbelastning.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-large">Prøv AINOR</button>
              <button className="btn-secondary-large">Book Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <div className="chat-bubble chat-bubble-1">
                  <span>Hei, kan jeg bestille bord for 5 klokken 19?</span>
                </div>
                <div className="chat-bubble chat-bubble-2">
                  <span>Vi har ledig kapasitet, la meg få detaljene dine.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


