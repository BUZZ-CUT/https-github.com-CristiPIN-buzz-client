import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getConfirmationResult, setConfirmationResult } from '../services/smsAuth';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { callFunction } from '../services/apiService';

function SmsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const phone = location.state?.phone || '';
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = mode === 'register' ? 5 : 2;

  const handleDigit = (val, idx) => {
    const newDigits = [...digits];
    newDigits[idx] = val.replace(/\D/g, '').slice(-1);
    setDigits(newDigits);
    if (val && idx < 5) {
      document.getElementById(`d${idx + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      document.getElementById('d5').focus();
    }
  };

  const isComplete = digits.every(d => d !== '');

  const handleVerify = async () => {
    if (!isComplete) return;
    setLoading(true);
    setError('');
    const code = digits.join('');
    try {
      const confirmation = getConfirmationResult();
      if (!confirmation) throw new Error('Sesiune expirata');
      await confirmation.confirm(code);

      const fullPhone = '+40' + phone;

      if (mode === 'login') {
        // Firebase autentificat — verificam daca exista in baza de date
        const { user } = await callFunction('get-user-info', {});
        if (!user) {
          setError('Număr neînregistrat. Creează un cont mai întâi.');
          return;
        }
        navigate('/pin-login', { state: { phone: fullPhone, user } });
      } else if (mode === 'reset') {
        const { user } = await callFunction('get-user-info', {});
        if (!user) {
          setError('Număr neînregistrat. Creează un cont mai întâi.');
          return;
        }
        navigate('/pin-set', { state: { mode: 'reset', user } });
      } else {
        navigate('/name', { state: { mode, phone: fullPhone } });
      }
    } catch (err) {
      if (err.message?.includes('Număr neînregistrat')) {
        setError(err.message);
      } else {
        setError('Cod incorect. Încearcă din nou.');
      }
    } finally {
      setLoading(false);
    }
  };

  const autoSendDone = useRef(false);
  useEffect(() => {
    if (mode === 'reset' && location.state?.autoSend && !autoSendDone.current) {
      autoSendDone.current = true;
      handleResend();
    }
  }, []);

  const handleResend = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-resend', { size: 'invisible' });
      const confirmation = await signInWithPhoneNumber(auth, '+40' + phone, recaptcha);
      setConfirmationResult(confirmation);
      setDigits(['', '', '', '', '', '']);
      setError('');
    } catch {
      setError('Nu am putut retrimite SMS-ul.');
    }
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div id="recaptcha-resend" />

      <div onClick={() => navigate(mode === 'register' ? '/register' : '/login', { state: { mode } })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= 1 ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />
        ))}
      </div>

      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 2 din {totalSteps}</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '1px', margin: '45px 0 8px', fontWeight: '700' }}>Cod de verificare</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '2', marginBottom: '22px' }}>
        Am trimis un cod de 6 cifre la <strong style={{ color: '#fff' }}>+40 {phone}</strong>
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'flex-start', paddingLeft: '8px' }}>
        {digits.map((digit, i) => (
          <input
            key={i}
            id={`d${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleDigit(e.target.value, i)}
            onPaste={i === 0 ? handlePaste : undefined}
            style={{ width: '52px', height: '68px', background: '#1E1635', border: `1.5px solid ${digit ? '#8B5CF6' : 'rgba(139,92,246,0.18)'}`, borderRadius: '14px', color: '#fff', fontSize: '26px', textAlign: 'center', outline: 'none', flexShrink: 0 }}
          />
        ))}
      </div>

      {error && <p style={{ color: '#EF4444', fontSize: '13px', paddingLeft: '8px' }}>{error}</p>}

      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', textAlign: 'center', marginTop: '8px' }}>
        Nu ai primit codul?{' '}
        <span onClick={handleResend} style={{ color: '#A78BFA', cursor: 'pointer' }}>Retrimite SMS</span>
      </p>

      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleVerify}
          disabled={!isComplete || loading}
          style={{ width: '100%', padding: '16px', background: isComplete && !loading ? '#8B5CF6' : 'rgba(139,92,246,0.3)', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: isComplete && !loading ? 'pointer' : 'not-allowed', fontWeight: '700' }}>
          {loading ? 'SE VERIFICA...' : 'VERIFICA CODUL'}
        </button>
      </div>
    </div>
  );
}

export default SmsPage;
