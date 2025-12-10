import "./Benefits.css";

export default function Benefits() {
  return (
    <section id="product" className="benefits">
      <div className="benefits-container">
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3 className="benefit-title">Boost Revenue Automatically</h3>
          <p className="benefit-description">
            AINOR captures <strong>every reservation</strong> opportunity, even when your staff is busy. Never miss a call or chat message again.
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">⚡</div>
          <h3 className="benefit-title">Maximize Staff Efficiency</h3>
          <p className="benefit-description">
            Free your team from repetitive calls. AINOR handles routine bookings while
            staff focuses on <strong>guest experience</strong>.
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🚀</div>
          <h3 className="benefit-title">Instant Answers, 24/7</h3>
          <p className="benefit-description">
            AINOR answers every call and chat instantly, <strong>24/7</strong>. Guests get immediate responses, and reservations are confirmed automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

