import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [email, setEmail] = useState('admin@blogg.se');
  const [password, setPassword] = useState('password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Inloggning misslyckades';
      setLocalError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container">
      <section className="panel card">
        <div className="panelHeader">
          <p className="kicker">ADMIN</p>
          <h1 style={{ fontFamily: 'var(--serif)', margin: '0 0 6px' }}>Logga in</h1>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Använd dina uppgifter för att hantera blogginlägg.
          </p>
        </div>

        <hr className="hr" style={{ margin: '14px 0 18px' }} />

        {(localError || error) && <div className="error">{localError || error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <label htmlFor="email">E-post</label>
            <input
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="formRow">
            <label htmlFor="password">Lösenord</label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="formActions">
            <button className="btn btnPrimary" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Loggar in…' : 'Logga in'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
