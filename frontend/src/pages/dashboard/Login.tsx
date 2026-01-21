import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './Login.css';

export default function DashboardLogin() {
  const [restaurantId, setRestaurantId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/restaurant-auth/login', {
        restaurantId,
        password,
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(response.error?.message || 'Innlogging feilet');
      }
    } catch (err: any) {
      setError(err.message || 'Innlogging feilet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-login">
      <div className="login-container">
        <h1>Restaurant Dashboard</h1>
        <p className="login-subtitle">Logg inn for å administrere reservasjoner</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="restaurantId">Restaurant ID</label>
            <input
              id="restaurantId"
              type="text"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              required
              placeholder="demo-restaurant-1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Passord</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logger inn...' : 'Logg inn'}
          </button>
        </form>

        <div className="login-help">
          <p>Test credentials:</p>
          <p>Restaurant ID: <code>demo-restaurant-1</code></p>
          <p>Passord: <code>test123</code></p>
        </div>
      </div>
    </div>
  );
}

