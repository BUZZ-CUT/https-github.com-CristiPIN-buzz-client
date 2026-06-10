import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { callFunction } from '../services/apiService';
import { saveSession } from '../services/session';
import { saveFcmToken } from '../services/fcmService';

function PinLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';
  const userInfo = location.state?.user || null;
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const keys = ['1','2','3','4','5','6','7','8','9','del','0',''];

  const initials = userInfo
    ? `${(userInfo.prenume || '')[0] || ''}${(userInfo.name || '')[0] || ''}`.toUpperCase()
    : '?';
  const displayName = userInfo
    ? `${userInfo.prenume || ''} ${(userInfo.name || '')[0] || ''}.`.trim()
    : '';

  const press = async (k) => {
    if (loading) return;
    if (k === 'del') { setPin(p => p.slice(0, -1)); setError(''); return; }
    if (k === '') return;
    if (pin.length >= 4) return;
    const newPin = pin + k;
    setPin(newPin);

    if (newPin.length === 4) {
      setLoading(true);
      setError('');
      setTimeout(async () => {
        try {
          const { user } = await callFunction('verify-pin', { pin: newPin });
          saveSession(user);
          saveFcmToken();
          navigate('/home');
        } catch (err) {
          setError(err.message || 'PIN incorect. Încearcă din nou.');
          setPin('');
        } finally {
          setLoading(false);
        }
      }, 300);
    }
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '16px', marginTop: '20px' }}>
        {initials}
      </div>
      <h2 style={{ color: '#fff', fontSize: '24px', letterSpacing: '1.5px', margin: '0 0 4px', fontWeight: '700' }}>{displayName}</h2>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', marginBottom: '28px' }}>{phone}</p>

      {error && <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: i < pin.length ? '#8B5CF6' : 'transparent', border: '2px solid', borderColor: i < pin.length ? '#8B5CF6' : 'rgba(139,92,246,0.25)' }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', width: '100%', marginTop: 'auto' }}>
        {keys.map((k, i) => (
          <div key={i} onClick={() => press(k)}
            style={{ height: '64px', background: k === '' ? 'transparent' : '#1E1635', border: k === '' ? 'none' : '1px solid rgba(139,92,246,0.18)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: k === '' || loading ? 'default' : 'pointer', fontSize: '24px', fontWeight: '700', color: k === 'del' ? 'rgba(255,255,255,0.55)' : '#fff', opacity: loading ? 0.5 : 1 }}>
            {k}
          </div>
        ))}
      </div>
      <p style={{ color: '#A78BFA', fontSize: '13px', cursor: 'pointer', marginTop: '20px' }}
        onClick={() => navigate('/sms', { state: { mode: 'reset', phone: phone.replace('+40', ''), autoSend: true } })}>
        Am uitat PIN-ul
      </p>
    </div>
  );
}

export default PinLoginPage;
