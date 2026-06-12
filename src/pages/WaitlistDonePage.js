import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function WaitlistDonePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { luni, selDate, calY } = state || {};

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ fontSize: '60px', marginBottom: '16px' }}>🕐</div>
      <h1 style={{ color: '#F59E0B', fontSize: '28px', fontWeight: '800', letterSpacing: '2px', margin: '0 0 12px' }}>PE LISTA DE AȘTEPTARE!</h1>
      {selDate && luni && calY ? (
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.6', margin: '0 0 32px', maxWidth: '300px' }}>
          Te anunțăm dacă se eliberează un loc pe{' '}
          <span style={{ color: '#fff', fontWeight: '600' }}>{selDate} {luni} {calY}</span>.
        </p>
      ) : (
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', margin: '0 0 32px' }}>
          Te anunțăm dacă se eliberează un loc.
        </p>
      )}
      <button onClick={() => navigate('/home', { replace: true })}
        style={{ width: '100%', maxWidth: '380px', padding: '16px', background: '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: 'pointer', fontWeight: '700' }}>
        ACASĂ
      </button>
    </div>
  );
}

export default WaitlistDonePage;
