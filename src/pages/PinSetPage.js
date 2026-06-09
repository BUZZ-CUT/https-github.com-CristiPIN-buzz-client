import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { callFunction } from '../services/apiService';
import { getSession, saveSession } from '../services/session';

function PinSetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const existingSession = getSession();
  const isChangePinMode = !!existingSession || state.mode === 'reset';

  const [pin, setPin] = useState('');
  const [step, setStep] = useState('set');
  const [firstPin, setFirstPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const keys = ['1','2','3','4','5','6','7','8','9','del','0',''];

  const press = async (k) => {
    if (k === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (k === '') return;
    if (pin.length >= 4) return;
    const newPin = pin + k;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(async () => {
        if (step === 'set') {
          setFirstPin(newPin);
          setPin('');
          setStep('confirm');
        } else {
          if (newPin !== firstPin) {
            setError('PIN-urile nu coincid. Încearcă din nou.');
            setPin('');
            setStep('set');
            setFirstPin('');
            return;
          }
          setLoading(true);
          setError('');
          try {
            if (isChangePinMode) {
              await callFunction('change-pin', { pin: newPin });
              if (state.mode === 'reset') {
                saveSession(state.user);
                navigate('/home');
              } else {
                navigate('/profile');
              }
            } else {
              const { user } = await callFunction('register', {
                pin: newPin,
                name: state.nume,
                prenume: state.prenume,
                instagram: state.ig || null,
                facebook: state.fb || null,
                tiktok: state.tt || null,
              });
              saveSession(user);
              navigate('/home');
            }
          } catch (err) {
            setError(err.message || 'Eroare. Încearcă din nou.');
            setPin('');
            setStep('set');
            setFirstPin('');
          } finally {
            setLoading(false);
          }
        }
      }, 300);
    }
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div onClick={() => navigate(state.mode === 'reset' ? '/login' : isChangePinMode ? '/profile' : '/social', { state })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {!isChangePinMode && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: '#8B5CF6' }} />)}
        </div>
      )}
      {!isChangePinMode && <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 5 din 5</div>}
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>
        {step === 'set' ? (isChangePinMode ? 'PIN nou' : 'Seteaza\nPIN-ul') : 'Confirma\nPIN-ul'}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
        {step === 'set' ? 'Alege un PIN de 4 cifre.' : 'Introdu din nou PIN-ul ales.'}
      </p>

      {error && <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: i < pin.length ? '#8B5CF6' : 'transparent', border: '2px solid', borderColor: i < pin.length ? '#8B5CF6' : 'rgba(139,92,246,0.25)' }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: 'auto' }}>
        {keys.map((k, i) => (
          <div key={i} onClick={() => !loading && press(k)}
            style={{ height: '64px', background: k === '' ? 'transparent' : '#1E1635', border: k === '' ? 'none' : '1px solid rgba(139,92,246,0.18)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: k === '' || loading ? 'default' : 'pointer', fontSize: k === 'del' ? '18px' : '24px', fontWeight: '700', color: k === 'del' ? 'rgba(255,255,255,0.55)' : '#fff', opacity: loading ? 0.5 : 1 }}>
            {loading && k === '' ? '...' : k}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PinSetPage;
