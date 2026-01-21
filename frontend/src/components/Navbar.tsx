import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="Ainor Logo" />
        </Link>
        <div className="navbar-links">
          <button onClick={() => scrollToSection("product")} className="nav-link">
            Produkt
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="nav-link">
            Slik fungerer det
          </button>
          <button onClick={() => scrollToSection("pricing")} className="nav-link">
            Priser
          </button>
          <button onClick={() => scrollToSection("faq")} className="nav-link">
            FAQ
          </button>
        </div>
        <div className="navbar-actions">
          <button className="btn-ghost">Logg inn</button>
          <button className="btn-primary" onClick={() => scrollToSection("cta")}>
            Prøv AINOR
          </button>
        </div>
      </div>
    </nav>
  );
}


