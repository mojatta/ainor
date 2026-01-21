import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './Dashboard.css';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string | null;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [restaurantId] = useState('demo-restaurant-1');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ newToday: 0, confirmedToday: 0, declinedToday: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    loadReservations();
  }, [restaurantId]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const response = await api.get<{
        reservations: Reservation[];
        stats: { newToday: number; confirmedToday: number; declinedToday: number };
      }>(`/api/restaurants/${restaurantId}/reservations`);

      if (response.ok && response.data) {
        // Filter to show NEW reservations by default, but keep all for stats
        const newReservations = (response.data.reservations || []).filter(r => r.status === 'NEW');
        setReservations(newReservations);
        setStats(response.data.stats || { newToday: 0, confirmedToday: 0, declinedToday: 0 });
      } else {
        setError(response.error?.message || 'Kunne ikke laste reservasjoner');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved lasting av reservasjoner');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/restaurant-auth/logout');
      navigate('/dashboard/login');
    } catch (err) {
      navigate('/dashboard/login');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      NEW: { label: 'Ny', className: 'status-new' },
      CONFIRMED: { label: 'Bekreftet', className: 'status-confirmed' },
      DECLINED: { label: 'Avslått', className: 'status-declined' },
      CANCELLED: { label: 'Kansellert', className: 'status-cancelled' },
    };
    const statusInfo = statusMap[status] || { label: status, className: 'status-default' };
    return (
      <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src="/assets/logo.png" alt="Ainor Logo" />
            </Link>
            <h1>Restaurant Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logg ut
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.newToday}</div>
            <div className="stat-label">Nye i dag</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.confirmedToday}</div>
            <div className="stat-label">Bekreftet i dag</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.declinedToday}</div>
            <div className="stat-label">Avslått i dag</div>
          </div>
        </div>

        <div className="reservations-section">
          <h2>Reservasjoner</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading">Laster reservasjoner...</div>
          ) : reservations.length === 0 ? (
            <div className="empty-state">Ingen reservasjoner funnet</div>
          ) : (
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Navn</th>
                  <th>Telefon</th>
                  <th>Dato</th>
                  <th>Tid</th>
                  <th>Antall</th>
                  <th>Status</th>
                  <th>Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.customerName}</td>
                    <td>{reservation.customerPhone}</td>
                    <td>{formatDate(reservation.date)}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.partySize}</td>
                    <td>{getStatusBadge(reservation.status)}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/dashboard/reservations/${reservation.id}`)}
                        className="action-button"
                      >
                        Åpne
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

