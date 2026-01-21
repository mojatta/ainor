import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/apiClient';
import './CreateRestaurant.css';

export default function CreateRestaurant() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [notificationSmsPhone, setNotificationSmsPhone] = useState('');
  const [suggestedId, setSuggestedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Generate slug from name
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!id) {
      const slug = generateSlug(value);
      setSuggestedId(slug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/ainor-admin/restaurants', {
        id: id || undefined,
        name,
        primaryPhone: primaryPhone || undefined,
        notificationSmsPhone: notificationSmsPhone || undefined,
      });

      if (response.ok && response.data) {
        navigate(`/ainor-admin/restaurants/${response.data.id}`);
      } else {
        setError(response.error?.message || 'Kunne ikke opprette restaurant');
      }
    } catch (err: any) {
      if (err.message !== 'UNAUTHORIZED') {
        setError('Feil ved opprettelse av restaurant');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-restaurant">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src="/assets/logo.png" alt="Ainor Logo" />
            </Link>
            <h1>Opprett ny restaurant</h1>
          </div>
          <button onClick={() => navigate('/ainor-admin')} className="back-button">
            ← Tilbake
          </button>
        </div>
      </header>

      <main className="create-main">
        <form onSubmit={handleSubmit} className="restaurant-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">
              Restaurantnavn <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="F.eks. Bella Vista Trattoria"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id">Restaurant ID</label>
            <input
              id="id"
              type="text"
              value={id || suggestedId}
              onChange={(e) => setId(e.target.value)}
              placeholder={suggestedId || 'Genereres automatisk fra navn'}
              pattern="[a-z0-9-]+"
              title="Kun små bokstaver, tall og bindestreker"
            />
            {suggestedId && !id && (
              <p className="form-hint">
                Forslag: <code>{suggestedId}</code> (basert på navn)
              </p>
            )}
            <p className="form-help">
              La stå tomt for automatisk generering, eller angi egen ID (kun små bokstaver, tall og bindestreker)
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="primaryPhone">Primærtelefon</label>
            <input
              id="primaryPhone"
              type="tel"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
              placeholder="+4791234567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notificationSmsPhone">SMS-notifikasjon telefon</label>
            <input
              id="notificationSmsPhone"
              type="tel"
              value={notificationSmsPhone}
              onChange={(e) => setNotificationSmsPhone(e.target.value)}
              placeholder="+4791234567"
            />
            <p className="form-help">
              Brukes for SMS-varsler (valgfritt)
            </p>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/ainor-admin')} className="cancel-button">
              Avbryt
            </button>
            <button type="submit" disabled={loading || !name} className="submit-button">
              {loading ? 'Oppretter...' : 'Opprett restaurant'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

