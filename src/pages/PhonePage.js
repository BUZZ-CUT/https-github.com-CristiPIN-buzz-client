import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PhonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const [phone, setPhone] = useState('');

  const totalSteps = mode === 'register' ? 5 : 2;

  return (
    <div style={{
      background: '#0A0A0F',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '48px 28px 40px',
      fontFamily: 'sans-serif'
    }}>
      {/* Back */}
      <div
        onClick={() => navigate('/welcome')}
        style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>
        ←
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: '3px', borderRadius: '2px',
            background: i === 0 ? '#8B5CF6' : 'rgba(139,92,246,0.15)'
          }} />
        ))}
      </div>

      {/* Titlu */}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>
        Pasul 1 din {totalSteps}
      </div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>
        Numarul tau<br />de telefon
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
        Vom trimite un cod SMS pentru a confirma numarul tau.
      </p>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{
          position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.55)', fontSize: '16px', fontWeight: '600'
        }}>+40</div>
        <input
          type="tel"
          placeholder="7xx xxx xxx"
          maxLength={9}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          style={{
            width: '100%',
            padding: '16px 16px 16px 58px',
            background: '#1E1635',
            border: '1.5px solid rgba(139,92,246,0.18)',
            borderRadius: '14px',
            color: '#fff',
            fontSize: '18px',
            outline: 'none',
            letterSpacing: '1px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Buton */}
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={() => navigate('/sms', { state: { mode, phone } })}
          disabled={phone.length < 9}
          style={{
            width: '100%',
            padding: '16px',
            background: phone.length >= 9 ? '#8B5CF6' : 'rgba(139,92,246,0.3)',
            border: 'none',
            borderRadius: '14px',
            fontSize: '18px',
            letterSpacing: '3px',
            color: '#fff',
            cursor: phone.length >= 9 ? 'pointer' : 'not-allowed',
            fontWeight: '700'
          }}>
          TRIMITE COD SMS
        </button>
      </div>
    </div>
  );
}

export default PhonePage;