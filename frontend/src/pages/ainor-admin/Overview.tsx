import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './Overview.css';

interface Restaurant {
  id: string;
  name: string;
  primaryPhone: string | null;
  createdAt: string;
  newTodayCount: number;
  confirmedTodayCount: number;
  declinedTodayCount: number;
  lastReservationAt: string | null;
}

export default function AinorAdminOverview() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const response = await api.get<Restaurant[]>('/api/ainor-admin/restaurants');

      if (response.ok && response.data) {
        setRestaurants(response.data);
      } else {
        setError(response.error?.message || 'Kunne ikke laste restauranter');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved lasting av data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/ainor-admin/logout');
      navigate('/ainor-admin/login');
    } catch (err) {
      navigate('/ainor-admin/login');
    }
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'Ingen';
    const date = new Date(dateStr);
    return date.toLocaleString('nb-NO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="admin-overview">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src="/assets/logo.png" alt="Ainor Logo" />
            </Link>
            <h1>AINOR Admin Panel</h1>
          </div>
          <div className="header-actions">
            <button onClick={() => navigate('/ainor-admin/restaurants/new')} className="primary-button">
              + Ny restaurant
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logg ut
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Laster restauranter...</div>
        ) : (
          <section className="admin-section">
            <h2>Restauranter</h2>
            {restaurants.length === 0 ? (
              <div className="empty-state">
                <p>Ingen restauranter registrert</p>
                <button onClick={() => navigate('/ainor-admin/restaurants/new')} className="primary-button">
                  Opprett første restaurant
                </button>
              </div>
            ) : (
              <table className="restaurants-table">
                <thead>
                  <tr>
                    <th>Navn</th>
                    <th>ID</th>
                    <th>Telefon</th>
                    <th>Nye i dag</th>
                    <th>Siste reservasjon</th>
                    <th>Handlinger</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr key={restaurant.id}>
                      <td className="restaurant-name">{restaurant.name}</td>
                      <td className="restaurant-id-cell">
                        <code>{restaurant.id}</code>
                      </td>
                      <td>{restaurant.primaryPhone || '-'}</td>
                      <td>
                        <span className="count-badge">{restaurant.newTodayCount}</span>
                      </td>
                      <td className="last-reservation">
                        {formatDateTime(restaurant.lastReservationAt)}
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/ainor-admin/restaurants/${restaurant.id}`)}
                          className="action-button"
                        >
                          Detaljer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

