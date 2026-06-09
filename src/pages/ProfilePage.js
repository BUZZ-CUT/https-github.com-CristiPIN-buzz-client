import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, clearSession } from '../services/session';
import { getMyAppointments } from '../services/bookingService';

const statusColor = { confirmat: '#22C55E', prezent: '#22C55E', neprezentat: '#EF4444', anulat: '#EF4444', reprogramat: '#F59E0B' };
const statusLabel = { confirmat: 'Confirmat', prezent: 'Prezent', neprezentat: 'Neprezentat', anulat: 'Anulat', reprogramat: 'Reprogramat' };

function ProfilePage() {
  const navigate = useNavigate();
  const user = getSession();
  const [appointments, setAppointments] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (!user) { navigate('/welcome'); return; }
    getMyAppointments().then(setAppointments).catch(console.error);
  }, []);

  const initials = user ? `${(user.prenume || '')[0] || ''}${(user.name || '')[0] || ''}`.toUpperCase() : '';
  const displayName = user ? `${user.prenume || ''} ${user.name || ''}`.trim() : '';

  const handleLogout = () => {
    clearSession();
    navigate('/welcome');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return ['', ''];
    const d = new Date(dateStr);
    const zi = d.getDate();
    const luni = ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];
    return [zi, luni[d.getMonth()]];
  };

  const bg = theme === 'dark' ? '#0A0A0F' : '#F5F5F7';
  const textCol = theme === 'dark' ? '#fff' : '#000';

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '90px' }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', color: textCol, letterSpacing: '2px' }}>Profilul meu</div>
        <div onClick={() => navigate('/edit-profile')} style={{ fontSize: '14px', color: '#A78BFA', cursor: 'pointer', fontWeight: '600' }}>Editeaza</div>
      </div>
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '0 24px' }} />

      {/* Avatar + info */}
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff' }}>{initials}</div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: textCol }}>{displayName}</div>
            <div style={{ fontSize: '13px', color: 'rgba(139,92,246,0.7)', marginTop: '3px' }}>{user?.phone}</div>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />

      {/* Setari */}
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: textCol, fontWeight: '700', marginBottom: '14px' }}>Setari</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(139,92,246,0.08)', cursor: 'pointer' }}
          onClick={() => navigate('/pin-set', { state: { phone: user?.phone, prenume: user?.prenume, nume: user?.name } })}>
          <div style={{ fontSize: '15px', color: textCol, fontWeight: '500' }}>Schimba PIN</div>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '18px' }}>›</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div style={{ fontSize: '15px', color: textCol, fontWeight: '500' }}>Tema</div>
          <div style={{ display: 'flex', background: 'rgba(139,92,246,0.1)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)' }}>
            {['dark','light'].map(t => (
              <div key={t} onClick={() => setTheme(t)}
                style={{ padding: '5px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', background: theme === t ? '#8B5CF6' : 'transparent', color: theme === t ? '#fff' : 'rgba(255,255,255,0.28)', borderRadius: '20px' }}>
                {t === 'dark' ? 'Inchis' : 'Deschis'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />

      {/* Istoric */}
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: textCol, fontWeight: '700', marginBottom: '14px' }}>Istoric programari</div>
        {appointments.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px' }}>Nicio programare încă.</div>
        ) : appointments.map((a) => {
          const [zi, luna] = formatDate(a.date);
          return (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{zi}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>{luna}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: textCol }}>{a.service?.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{a.service?.duration_min} min · {a.service?.price} lei</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: statusColor[a.status] }}>{statusLabel[a.status]}</div>
            </div>
          );
        })}
        <button onClick={handleLogout}
          style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', fontSize: '15px', letterSpacing: '2px', color: '#EF4444', cursor: 'pointer', marginTop: '22px' }}>
          DECONECTEAZA-TE
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#1E1635', borderTop: '1px solid rgba(139,92,246,0.15)', padding: '8px 0 20px', display: 'flex', alignItems: 'center', zIndex: 50 }}>
        {[['🏠','Home',false],['📅','Programare',false],['👤','Profil',true]].map(([icon, label, active], i) => (
          <div key={i} onClick={() => { if (label === 'Home') navigate('/home'); if (label === 'Programare') navigate('/booking'); }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: active ? '#A78BFA' : 'rgba(255,255,255,0.28)', padding: '4px 0' }}>
            <span style={{ fontSize: '22px' }}>{icon}</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: '500' }}>{label}</span>
            {active && <div style={{ width: '4px', height: '4px', background: '#A78BFA', borderRadius: '50%' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
