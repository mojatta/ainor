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
        <div className="navbar-logo" onClick={() => scrollToSection("hero")}>
          AINOR
        </div>
        <div className="navbar-links">
          <button onClick={() => scrollToSection("product")} className="nav-link">
            Product
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="nav-link">
            How it works
          </button>
          <button onClick={() => scrollToSection("pricing")} className="nav-link">
            Pricing
          </button>
          <button onClick={() => scrollToSection("faq")} className="nav-link">
            FAQ
          </button>
        </div>
        <div className="navbar-actions">
          <button className="btn-ghost">Sign in</button>
          <button className="btn-primary" onClick={() => scrollToSection("cta")}>
            Try AINOR
          </button>
        </div>
      </div>
    </nav>
  );
}

