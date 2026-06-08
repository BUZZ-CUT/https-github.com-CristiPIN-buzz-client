import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { setConfirmationResult } from '../services/smsAuth';

function PhonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);

  const totalSteps = mode === 'register' ? 5 : 2;

  useEffect(() => {
    // Initializeaza reCAPTCHA invizibil
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
        recaptchaRef.current = null;
      }
    };
  }, []);

  const handleSend = async () => {
    if (phone.length < 9) return;
    setLoading(true);
    setError('');
    try {
      const fullPhone = '+40' + phone;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaRef.current);
      setConfirmationResult(confirmation);
      navigate('/sms', { state: { mode, phone } });
    } catch (err) {
      console.error(err);
      setError('Nu am putut trimite SMS-ul. Verifică numărul și încearcă din nou.');
      // Reseteaza recaptcha la eroare
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div id="recaptcha-container" />

      <div onClick={() => navigate('/welcome')} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i === 0 ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />
        ))}
      </div>

      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 1 din {totalSteps}</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>Numarul tau<br />de telefon</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
        Vom trimite un cod SMS pentru a confirma numarul tau.
      </p>

      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.55)', fontSize: '16px', fontWeight: '600' }}>+40</div>
        <input
          type="tel"
          placeholder="7xx xxx xxx"
          maxLength={9}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          style={{ width: '100%', padding: '16px 16px 16px 58px', background: '#1E1635', border: '1.5px solid rgba(139,92,246,0.18)', borderRadius: '14px', color: '#fff', fontSize: '18px', outline: 'none', letterSpacing: '1px', boxSizing: 'border-box' }}
        />
      </div>

      {error && <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}

      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleSend}
          disabled={phone.length < 9 || loading}
          style={{ width: '100%', padding: '16px', background: phone.length >= 9 && !loading ? '#8B5CF6' : 'rgba(139,92,246,0.3)', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: phone.length >= 9 && !loading ? 'pointer' : 'not-allowed', fontWeight: '700' }}>
          {loading ? 'SE TRIMITE...' : 'TRIMITE COD SMS'}
        </button>
      </div>
    </div>
  );
}

export default PhonePage;
