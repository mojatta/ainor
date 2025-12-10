import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-container">
        <h2 className="how-title">How AINOR Works</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <h3 className="how-step-title">Guest contacts your restaurant</h3>
            <p className="how-step-description">
              A customer reaches out via phone, website chat, or messaging app.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <h3 className="how-step-title">AINOR answers and handles the request</h3>
            <p className="how-step-description">
              AINOR answers instantly, understands the request, asks for details, and handles the entire conversation.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <h3 className="how-step-title">Staff & guests receive confirmations instantly</h3>
            <p className="how-step-description">
              Reservation is created, confirmed via SMS/email, and synced to your system. Everyone gets instant notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

