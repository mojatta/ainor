import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-container">
        <h2 className="how-title">Slik Fungerer AINOR</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <h3 className="how-step-title">Gjesten kontakter restauranten din</h3>
            <p className="how-step-description">
              En kunde tar kontakt via telefon, nettstedchat eller meldingsapp.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <h3 className="how-step-title">AINOR svarer og håndterer forespørselen</h3>
            <p className="how-step-description">
              AINOR svarer umiddelbart, forstår forespørselen, spør etter detaljer og håndterer hele samtalen.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <h3 className="how-step-title">Personal og gjester mottar bekreftelser umiddelbart</h3>
            <p className="how-step-description">
              Reservasjon opprettes, bekreftes via SMS/e-post og synkroniseres til systemet ditt. Alle får umiddelbare varsler.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


