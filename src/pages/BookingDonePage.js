import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookingDonePage() {
  const navigate = useNavigate();
  const { selSrv, selDate, luni, calY, selOra, isReschedule } = useLocation().state || {};

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px 40px', fontFamily: 'sans-serif' }}>

      {/* Icon succes */}
      <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
          <path d="M8 20L16 28L32 12" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase', textAlign: 'center' }}>{isReschedule ? 'Reprogramare confirmata' : 'Programare confirmata'}</div>
      <h1 style={{ color: '#fff', fontSize: '32px', letterSpacing: '2px', fontWeight: '700', margin: '0 0 8px', textAlign: 'center' }}>{isReschedule ? 'Programare actualizata!' : 'Te asteptam!'}</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', textAlign: 'center', marginBottom: '36px', lineHeight: '1.6' }}>
        {isReschedule ? 'Programarea ta a fost mutată cu succes la noua dată.' : 'Vei primi o notificare cu 24h și 1h înainte de programare.'}
      </p>

      {/* Card detalii */}
      <div style={{ width: '100%', maxWidth: '382px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '18px', padding: '20px', marginBottom: '32px' }}>
        {[
          ['Serviciu', selSrv?.name],
          ['Data', `${selDate} ${luni} ${calY}`],
          ['Ora', selOra],
          ['Durata', selSrv?.dur],
          ['Pret', selSrv?.price],
        ].map(([lbl, val], i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(139,92,246,0.08)' : 'none' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{lbl}</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: i === 4 ? '#A78BFA' : '#fff' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Buton acasa */}
      <button
        onClick={() => navigate('/home')}
        style={{ width: '100%', maxWidth: '382px', padding: '16px', background: '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: 'pointer', fontWeight: '700' }}
      >
        ACASA
      </button>
    </div>
  );
}

export default BookingDonePage;
