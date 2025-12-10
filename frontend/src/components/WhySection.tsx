import "./WhySection.css";

export default function WhySection() {
  return (
    <section className="why-section">
      <div className="why-container">
        <h2 className="why-title">Why AINOR?</h2>
        <p className="why-subtitle">
          AI purpose-built for restaurants. Understands menus, handles reservations,
          and speaks your guests' language.
        </p>
        <div className="why-grid">
          <div className="why-item">
            <div className="why-item-icon">🌐</div>
            <h3 className="why-item-title">Cross-Sell Across Locations with AINOR</h3>
            <p className="why-item-text">
              AINOR helps you <strong>promote specials and upsell</strong> across multiple restaurant locations, maximizing revenue from every interaction.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">⭐</div>
            <h3 className="why-item-title">VIP Call Routing Powered by AINOR</h3>
            <p className="why-item-text">
              AINOR automatically <strong>identifies VIP guests</strong> and routes their calls to your best staff members for personalized service.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">📊</div>
            <h3 className="why-item-title">Smart Alerts and Insights</h3>
            <p className="why-item-text">
              AINOR provides <strong>real-time analytics</strong> and alerts on peak times, conversion rates, and guest preferences to help you make data-driven decisions.
            </p>
          </div>
          <div className="why-item">
            <div className="why-item-icon">✨</div>
            <h3 className="why-item-title">5-Star Guest Experience</h3>
            <p className="why-item-text">
              AINOR delivers <strong>consistent, professional service</strong> that matches your brand voice, ensuring every guest interaction is exceptional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

