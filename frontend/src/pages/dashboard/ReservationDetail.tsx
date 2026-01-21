import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './ReservationDetail.css';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string | null;
  status: string;
  source: string;
  createdAt: string;
  events?: Array<{
    id: string;
    type: string;
    actor: string;
    createdAt: string;
    payloadJson: string | null;
  }>;
}

export default function ReservationDetail() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [restaurantId] = useState('demo-restaurant-1');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (reservationId) {
      loadReservation();
    }
  }, [reservationId]);

  const loadReservation = async () => {
    try {
      setLoading(true);
      const response = await api.get<Reservation>(
        `/api/restaurants/${restaurantId}/reservations/${reservationId}`
      );

      if (response.ok && response.data) {
        setReservation(response.data);
      } else {
        setError(response.error?.message || 'Kunne ikke laste reservasjon');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved lasting av reservasjon');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!reservationId) return;

    try {
      setUpdating(true);
      const response = await api.patch(
        `/api/restaurants/${restaurantId}/reservations/${reservationId}`,
        { status: newStatus }
      );

      if (response.ok) {
        await loadReservation();
      } else {
        setError(response.error?.message || 'Kunne ikke oppdatere status');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved oppdatering av status');
      }
    } finally {
      setUpdating(false);
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

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('nb-NO', {
      year: 'numeric',
      month: 'long',
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
      <div className="reservation-detail">
        <div className="loading">Laster reservasjon...</div>
      </div>
    );
  }

  if (error && !reservation) {
    return (
      <div className="reservation-detail">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Tilbake til oversikt
        </button>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="reservation-detail">
        <div className="error-message">Reservasjon ikke funnet</div>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Tilbake til oversikt
        </button>
      </div>
    );
  }

  return (
    <div className="reservation-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Tilbake
        </button>
        <h1>Reservasjonsdetaljer</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Kundeinformasjon</h2>
          <div className="detail-row">
            <span className="label">Navn:</span>
            <span className="value">{reservation.customerName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Telefon:</span>
            <span className="value">
              <a href={`tel:${reservation.customerPhone}`}>{reservation.customerPhone}</a>
            </span>
          </div>
        </div>

        <div className="detail-card">
          <h2>Reservasjonsdetaljer</h2>
          <div className="detail-row">
            <span className="label">Dato:</span>
            <span className="value">{formatDate(reservation.date)}</span>
          </div>
          <div className="detail-row">
            <span className="label">Tid:</span>
            <span className="value">{reservation.time}</span>
          </div>
          <div className="detail-row">
            <span className="label">Antall personer:</span>
            <span className="value">{reservation.partySize}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className="value">{getStatusBadge(reservation.status)}</span>
          </div>
          {reservation.specialRequests && (
            <div className="detail-row">
              <span className="label">Spesielle ønsker:</span>
              <span className="value">{reservation.specialRequests}</span>
            </div>
          )}
        </div>

        {reservation.status === 'NEW' && (
          <div className="detail-card">
            <h2>Handlinger</h2>
            <div className="action-buttons">
              <button
                onClick={() => updateStatus('CONFIRMED')}
                disabled={updating}
                className="action-button confirm-button"
              >
                Bekreft reservasjon
              </button>
              <button
                onClick={() => updateStatus('DECLINED')}
                disabled={updating}
                className="action-button decline-button"
              >
                Avslå reservasjon
              </button>
            </div>
          </div>
        )}

        {reservation.events && reservation.events.length > 0 && (
          <div className="detail-card">
            <h2>Hendelseslogg</h2>
            <div className="events-list">
              {reservation.events.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-type">{event.type}</div>
                  <div className="event-meta">
                    {formatDateTime(event.createdAt)} • {event.actor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

