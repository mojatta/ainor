import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">AINOR</div>
          <p className="footer-description">
            AI Stemme- og Chat-Assistent for Restauranter. AINOR går aldri glipp av et anrop eller en reservasjon.
          </p>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Hopp til</h4>
          <ul className="footer-links">
            <li><a href="#product">Produkt</a></li>
            <li><a href="#how-it-works">Slik fungerer det</a></li>
            <li><a href="#pricing">Priser</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Selskap</h4>
          <ul className="footer-links">
            <li><a href="#about">Om oss</a></li>
            <li><a href="#docs">Dokumentasjon</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Følg oss</h4>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">🔗</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AINOR. Alle rettigheter reservert.</p>
      </div>
    </footer>
  );
}


