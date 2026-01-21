import "./SetupSteps.css";

export default function SetupSteps() {
  return (
    <section className="setup-steps">
      <div className="setup-container">
        <div className="setup-image">
          <div className="setup-image-placeholder">🍽️</div>
        </div>
        <div className="setup-content">
          <h2 className="setup-title">Kom i gang på 30 minutter</h2>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Book Din Demo</h3>
                <p className="step-description">
                  Book en rask samtale med teamet vårt for å se AINOR i aksjon og diskutere restaurantens behov.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Koble AINOR til Restauranten Din</h3>
                <p className="step-description">
                  Vi integrerer AINOR med reservasjonssystemet, kassasystemet eller kalenderen din. Enkle API-tilkoblinger som tar minutter.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Gå Aldri Glipp av Et Anrop Igjen</h3>
                <p className="step-description">
                  AINOR går live og begynner å svare på anrop og chat umiddelbart. Ingen opplæringsperiode nødvendig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


