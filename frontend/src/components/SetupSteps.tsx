import "./SetupSteps.css";

export default function SetupSteps() {
  return (
    <section className="setup-steps">
      <div className="setup-container">
        <div className="setup-image">
          <div className="setup-image-placeholder">🍽️</div>
        </div>
        <div className="setup-content">
          <h2 className="setup-title">Get set up in 30 minutes</h2>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Schedule Your Demo</h3>
                <p className="step-description">
                  Book a quick call with our team to see AINOR in action and discuss
                  your restaurant's needs.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Connect AINOR to Your Restaurant</h3>
                <p className="step-description">
                  We'll integrate AINOR with your reservation system, POS, or calendar. Simple
                  API connections that take minutes.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Never Miss a Call Again</h3>
                <p className="step-description">
                  AINOR goes live and starts answering calls and chats immediately.
                  No training period needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

