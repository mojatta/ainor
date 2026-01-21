import "./WhySection.css";

export default function WhySection() {
  return (
    <section className="why-section">
      <div className="why-container">
        <h2 className="why-title">Hvorfor AINOR?</h2>
        <p className="why-subtitle">
          AI bygget spesielt for restauranter. Forstår menyer, håndterer reservasjoner og snakker gjestenes språk.
        </p>
        <div className="why-grid">
          <div className="why-item">
            <div className="why-item-icon">🌐</div>
            <h3 className="why-item-title">Kryssalg På Tvers Av Steder med AINOR</h3>
            <p className="why-item-text">
              AINOR hjelper deg med å <strong>promotere spesialtilbud og merforbruk</strong> på tvers av flere restaurantsteder, og maksimerer inntektene fra hver interaksjon.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">⭐</div>
            <h3 className="why-item-title">VIP-Anropsruting Drevet av AINOR</h3>
            <p className="why-item-text">
              AINOR <strong>identifiserer automatisk VIP-gjester</strong> og ruter anropene deres til dine beste medarbeidere for personlig service.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">📊</div>
            <h3 className="why-item-title">Smarte Varsler og Innspill</h3>
            <p className="why-item-text">
              AINOR gir <strong>sanntidsanalyse</strong> og varsler om topptider, konverteringsrater og gjestepreferanser for å hjelpe deg med datadrevne beslutninger.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">✨</div>
            <h3 className="why-item-title">5-stjerners Gjesteopplevelse</h3>
            <p className="why-item-text">
              AINOR leverer <strong>konsistent, profesjonell service</strong> som matcher merkevarens stemme og sikrer at hver gjesteinteraksjon er eksepsjonell.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


