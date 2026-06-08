import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const phone = location.state?.phone || '';
  const [prenume, setPrenume] = useState('');
  const [nume, setNume] = useState('');

  const inp = { width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', color: '#fff', fontFamily: 'sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div onClick={() => navigate('/sms', { state: { mode, phone } })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= 2 ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />)}
      </div>
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 3 din 5</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>Cum te<br />cheama?</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>Numele tau va fi vizibil pentru frizer la programari.</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <input style={inp} placeholder="Prenume" value={prenume} onChange={e => setPrenume(e.target.value)} />
        <input style={inp} placeholder="Nume" value={nume} onChange={e => setNume(e.target.value)} />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button onClick={() => navigate('/social', { state: { mode, phone, prenume, nume } })}
          disabled={!prenume || !nume}
          style={{ width: '100%', padding: '16px', background: prenume && nume ? '#8B5CF6' : 'rgba(139,92,246,0.3)', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: prenume && nume ? 'pointer' : 'not-allowed', fontWeight: '700' }}>
          CONTINUA
        </button>
      </div>
    </div>
  );
}
export default NamePage;