import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PinSetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const [pin, setPin] = useState('');
  const [step, setStep] = useState('set');
  const [firstPin, setFirstPin] = useState('');

  const keys = ['1','2','3','4','5','6','7','8','9','del','0',''];

  const press = (k) => {
    if (k === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (k === '') return;
    if (pin.length >= 4) return;
    const newPin = pin + k;
    setPin(newPin);
    if (newPin.length === 4) {
      setTimeout(() => {
        if (step === 'set') { setFirstPin(newPin); setPin(''); setStep('confirm'); }
        else { navigate('/home'); }
      }, 300);
    }
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div onClick={() => navigate('/social', { state })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: '#8B5CF6' }} />)}
      </div>
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 5 din 5</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>{step === 'set' ? 'Seteaza\nPIN-ul' : 'Confirma\nPIN-ul'}</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
        {step === 'set' ? 'Alege un PIN de 4 cifre.' : 'Introdu din nou PIN-ul ales.'}
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: i < pin.length ? '#8B5CF6' : 'transparent', border: '2px solid', borderColor: i < pin.length ? '#8B5CF6' : 'rgba(139,92,246,0.25)' }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: 'auto' }}>
        {keys.map((k, i) => (
          <div key={i} onClick={() => press(k)}
            style={{ height: '64px', background: k === '' ? 'transparent' : '#1E1635', border: k === '' ? 'none' : '1px solid rgba(139,92,246,0.18)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: k === '' ? 'default' : 'pointer', fontSize: '24px', fontWeight: '700', color: k === 'del' ? 'rgba(255,255,255,0.55)' : '#fff' }}>
            {k}
          </div>
        ))}
      </div>
    </div>
  );
}
export default PinSetPage;