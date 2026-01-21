import "./Benefits.css";

export default function Benefits() {
  return (
    <section id="product" className="benefits">
      <div className="benefits-container">
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3 className="benefit-title">Øk Inntektene Automatisk</h3>
          <p className="benefit-description">
            AINOR fanger opp <strong>hver reservasjonsmulighet</strong>, selv når personalet ditt er opptatt. Går aldri glipp av et anrop eller chatmelding igjen.
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">⚡</div>
          <h3 className="benefit-title">Maksimer Personalets Effektivitet</h3>
          <p className="benefit-description">
            Frigjør teamet ditt fra repeterende anrop. AINOR håndterer rutinebestillinger mens personalet fokuserer på <strong>gjesteopplevelsen</strong>.
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🚀</div>
          <h3 className="benefit-title">Øyeblikkelige Svar, 24/7</h3>
          <p className="benefit-description">
            AINOR svarer på hvert anrop og chat umiddelbart, <strong>24/7</strong>. Gjester får umiddelbare svar, og reservasjoner bekreftes automatisk.
          </p>
        </div>
      </div>
    </section>
  );
}


