import "./CallToAction.css";

export default function CallToAction() {
  return (
    <section id="cta" className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to try AINOR?</h2>
        <p className="cta-description">
          Join hundreds of restaurants using AINOR to never miss a reservation.
        </p>
        <button className="btn-cta">Get Started with AINOR</button>
      </div>
    </section>
  );
}

