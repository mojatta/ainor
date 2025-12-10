export default function RestaurantInfo() {
  return (
    <div className="restaurant-info">
      <h2 className="restaurant-info-title">Bella Vista Trattoria</h2>
      <p className="restaurant-info-description">
        Authentic Italian cuisine in the heart of the city. We serve traditional dishes made with fresh, locally-sourced ingredients.
      </p>

      <div className="restaurant-info-details">
        <div className="info-item">
          <span className="info-icon">📍</span>
          <span>123 Main Street, San Francisco, CA 94102</span>
        </div>
        <div className="info-item">
          <span className="info-icon">☎️</span>
          <span>+1 (415) 555-0123</span>
        </div>
        <div className="info-item">
          <span className="info-icon">⏰</span>
          <span>Today: 11:00 AM - 10:00 PM</span>
        </div>
      </div>

      <div className="restaurant-info-features">
        <h3 className="features-title">What I can help with:</h3>
        <ul className="features-list">
          <li>✔ Ask about opening hours</li>
          <li>✔ Check menu and dietary options</li>
          <li>✔ Make or change reservations</li>
        </ul>
      </div>
    </div>
  );
}


