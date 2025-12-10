import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">AINOR</div>
          <p className="footer-description">
            AI Voice & Chat Assistant for Restaurants. AINOR never misses a call or reservation.
          </p>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Jump to it</h4>
          <ul className="footer-links">
            <li><a href="#product">Product</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#docs">Docs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Follow us</h4>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">🔗</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AINOR. All rights reserved.</p>
      </div>
    </footer>
  );
}

