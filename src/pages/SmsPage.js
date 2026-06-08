import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SmsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const phone = location.state?.phone || '';
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  const handleDigit = (val, idx) => {
    const newDigits = [...digits];
    newDigits[idx] = val.replace(/\D/g, '').slice(-1);
    setDigits(newDigits);
    if (val && idx < 5) {
      document.getElementById(`d${idx + 1}`).focus();
    }
  };

  const isComplete = digits.every(d => d !== '');

  const handleNext = () => {
    if (mode === 'login') navigate('/pin-login');
    else navigate('/name', { state: { mode, phone } });
  };

  const totalSteps = mode === 'register' ? 5 : 2;

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div onClick={() => navigate('/register', { state: { mode } })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= 1 ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />
        ))}
      </div>
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 2 din {totalSteps}</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '1px', margin: '45px 0 8px', fontWeight: '700' }}>Cod de verificare</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '2', marginBottom: '22px',margintop: '32px'}}>
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
            style={{
              width: '52px',
              height: '68px',
              background: '#1E1635',
              border: `1.5px solid ${digit ? '#8B5CF6' : 'rgba(139,92,246,0.18)'}`,
              borderRadius: '14px',
              color: '#fff',
              fontSize: '26px',
              textAlign: 'center',
              outline: 'none',
              flexShrink: 0
            }}
          />
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', textAlign: 'center' }}>
        Nu ai primit codul? <span style={{ color: '#A78BFA', cursor: 'pointer' }}>Retrimite SMS</span>
      </p>
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleNext}
          disabled={!isComplete}
          style={{
            width: '100%', padding: '16px',
            background: isComplete ? '#8B5CF6' : 'rgba(139,92,246,0.3)',
            border: 'none', borderRadius: '14px',
            fontSize: '18px', letterSpacing: '3px',
            color: '#fff', cursor: isComplete ? 'pointer' : 'not-allowed',
            fontWeight: '700'
          }}>
          VERIFICA CODUL
        </button>
      </div>
    </div>
  );
}

export default SmsPage;