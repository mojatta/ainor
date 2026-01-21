import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './RestaurantDetails.css';

interface Restaurant {
  id: string;
  name: string;
  primaryPhone: string | null;
  notificationSmsPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  status: string;
  createdAt: string;
}

interface OverviewData {
  restaurant: Restaurant;
  reservations: Reservation[];
  statusCounts: {
    new: number;
    confirmed: number;
    declined: number;
    cancelled: number;
  };
}

export default function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    primaryPhone: '',
    notificationSmsPhone: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadOverview();
    }
  }, [id]);

  const loadOverview = async () => {
    try {
      setLoading(true);
      const response = await api.get<OverviewData>(`/api/ainor-admin/restaurants/${id}/overview`);

      if (response.ok && response.data) {
        setOverview(response.data);
        setFormData({
          name: response.data.restaurant.name,
          primaryPhone: response.data.restaurant.primaryPhone || '',
          notificationSmsPhone: response.data.restaurant.notificationSmsPhone || '',
        });
      } else {
        setError(response.error?.message || 'Kunne ikke laste restaurant');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved lasting av restaurant');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!id) return;

    try {
      setSaving(true);
      const response = await api.patch(`/api/ainor-admin/restaurants/${id}`, {
        name: formData.name,
        primaryPhone: formData.primaryPhone || undefined,
        notificationSmsPhone: formData.notificationSmsPhone || undefined,
      });

      if (response.ok) {
        setEditing(false);
        await loadOverview();
      } else {
        setError(response.error?.message || 'Kunne ikke oppdatere restaurant');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved oppdatering');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!id) return;

    try {
      const response = await api.post<{ password: string }>(
        `/api/ainor-admin/restaurants/${id}/reset-password`
      );

      if (response.ok && response.data) {
        setGeneratedPassword(response.data.password);
        setShowPasswordModal(true);
      } else {
        setError(response.error?.message || 'Kunne ikke nullstille passord');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved nullstilling av passord');
      }
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Passord kopiert til utklippstavle!');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('nb-NO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (loading) {
    return (
      <div className="restaurant-details">
        <div className="loading">Laster restaurant...</div>
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div className="restaurant-details">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/ainor-admin')} className="back-button">
          Tilbake til oversikt
        </button>
      </div>
    );
  }

  if (!overview) {
    return null;
  }

  return (
    <div className="restaurant-details">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src="/assets/logo.png" alt="Ainor Logo" />
            </Link>
            <div>
              <button onClick={() => navigate('/ainor-admin')} className="back-button">
                ← Tilbake
              </button>
              <h1>{overview.restaurant.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="details-main">
        {error && <div className="error-message">{error}</div>}

        <section className="details-section">
          <div className="section-header">
            <h2>Restaurantinformasjon</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="edit-button">
                Rediger
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={() => { setEditing(false); loadOverview(); }} className="cancel-button">
                  Avbryt
                </button>
                <button onClick={handleSave} disabled={saving} className="save-button">
                  {saving ? 'Lagrer...' : 'Lagre'}
                </button>
              </div>
            )}
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Navn</label>
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="edit-input"
                />
              ) : (
                <div className="info-value">{overview.restaurant.name}</div>
              )}
            </div>

            <div className="info-item">
              <label>Primærtelefon</label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.primaryPhone}
                  onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                  className="edit-input"
                  placeholder="+4791234567"
                />
              ) : (
                <div className="info-value">{overview.restaurant.primaryPhone || '-'}</div>
              )}
            </div>

            <div className="info-item">
              <label>SMS-notifikasjon telefon</label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.notificationSmsPhone}
                  onChange={(e) => setFormData({ ...formData, notificationSmsPhone: e.target.value })}
                  className="edit-input"
                  placeholder="+4791234567"
                />
              ) : (
                <div className="info-value">{overview.restaurant.notificationSmsPhone || '-'}</div>
              )}
            </div>

            <div className="info-item">
              <label>Opprettet</label>
              <div className="info-value">{formatDateTime(overview.restaurant.createdAt)}</div>
            </div>
          </div>

          <div className="action-section">
            <button onClick={handleResetPassword} className="reset-password-button">
              Generer nytt dashboard-passord
            </button>
          </div>
        </section>

        <section className="details-section">
          <h2>Integrasjon</h2>
          <div className="integration-panel">
            <div className="integration-item">
              <label>Restaurant ID</label>
              <code className="code-block">{overview.restaurant.id}</code>
            </div>
            <div className="integration-item">
              <label>Public booking endpoint</label>
              <code className="code-block">
                POST /api/public/restaurants/{overview.restaurant.id}/reservations
              </code>
            </div>
            <p className="integration-note">
              <strong>Merk:</strong> Restaurant telefonnummer vil bli brukt for telefon-AI senere.
            </p>
          </div>
        </section>

        <section className="details-section">
          <h2>Statistikk</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{overview.statusCounts.new}</div>
              <div className="stat-label">Nye</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{overview.statusCounts.confirmed}</div>
              <div className="stat-label">Bekreftet</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{overview.statusCounts.declined}</div>
              <div className="stat-label">Avslått</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{overview.statusCounts.cancelled}</div>
              <div className="stat-label">Kansellert</div>
            </div>
          </div>
        </section>

        <section className="details-section">
          <h2>Siste reservasjoner</h2>
          {overview.reservations.length === 0 ? (
            <div className="empty-state">Ingen reservasjoner</div>
          ) : (
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Kunde</th>
                  <th>Telefon</th>
                  <th>Dato</th>
                  <th>Tid</th>
                  <th>Antall</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {overview.reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.customerName}</td>
                    <td>{reservation.customerPhone}</td>
                    <td>{formatDate(reservation.date)}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.partySize}</td>
                    <td>{getStatusBadge(reservation.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Nytt dashboard-passord generert</h3>
            <p className="modal-warning">
              <strong>Viktig:</strong> Dette passordet vises kun én gang. Kopier det nå!
            </p>
            <div className="password-display">
              <code>{generatedPassword}</code>
              <button onClick={copyPassword} className="copy-button">
                Kopier
              </button>
            </div>
            <p className="modal-info">
              Restauranten kan nå logge inn på /dashboard/login med dette passordet.
            </p>
            <button onClick={() => setShowPasswordModal(false)} className="modal-close-button">
              Lukk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

