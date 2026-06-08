import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PinLoginPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const keys = ['1','2','3','4','5','6','7','8','9','del','0',''];

  const press = (k) => {
    if (k === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (k === '') return;
    if (pin.length >= 4) return;
    const newPin = pin + k;
    setPin(newPin);
    if (newPin.length === 4) setTimeout(() => navigate('/home'), 300);
  };

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '16px', marginTop: '20px' }}>AN</div>
      <h2 style={{ color: '#fff', fontSize: '24px', letterSpacing: '1.5px', margin: '0 0 4px', fontWeight: '700' }}>Andrei N.</h2>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', marginBottom: '28px' }}>+40 712 345 678</p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: i < pin.length ? '#8B5CF6' : 'transparent', border: '2px solid', borderColor: i < pin.length ? '#8B5CF6' : 'rgba(139,92,246,0.25)' }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', width: '100%', marginTop: 'auto' }}>
        {keys.map((k, i) => (
          <div key={i} onClick={() => press(k)}
            style={{ height: '64px', background: k === '' ? 'transparent' : '#1E1635', border: k === '' ? 'none' : '1px solid rgba(139,92,246,0.18)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: k === '' ? 'default' : 'pointer', fontSize: '24px', fontWeight: '700', color: k === 'del' ? 'rgba(255,255,255,0.55)' : '#fff' }}>
            {k}
          </div>
        ))}
      </div>
      <p style={{ color: '#A78BFA', fontSize: '13px', cursor: 'pointer', marginTop: '20px' }}>Am uitat PIN-ul</p>
    </div>
  );
}
export default PinLoginPage;