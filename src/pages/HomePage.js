import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../services/session';
import { getNextAppointment, getServices } from '../services/bookingService';

function HomePage() {
  const navigate = useNavigate();
  const user = getSession();
  const [nextAppt, setNextAppt] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/welcome'); return; }
    Promise.all([
      getNextAppointment(),
      getServices(),
    ]).then(([appt, srvs]) => {
      setNextAppt(appt);
      setServices(srvs);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const initials = user ? `${(user.prenume || '')[0] || ''}${(user.name || '')[0] || ''}`.toUpperCase() : '';
  const displayName = user ? `${user.prenume || ''} ${(user.name || '')[0] || ''}.`.trim() : '';

  const statusColor = { confirmat: '#22C55E', prezent: '#22C55E', neprezentat: '#EF4444', anulat: '#EF4444', reprogramat: '#F59E0B' };
  const statusLabel = { confirmat: 'CONFIRMAT', prezent: 'PREZENT', neprezentat: 'NEPREZENTAT', anulat: 'ANULAT', reprogramat: 'REPROGRAMAT' };

  const formatDate = (dateStr, timeStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    const isToday = d.toDateString() === today.toDateString();
    const isTomorrow = d.toDateString() === tomorrow.toDateString();
    const prefix = isToday ? 'Azi' : isTomorrow ? 'Maine' : d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
    return `${prefix} · ${timeStr?.slice(0, 5) || ''}`;
  };

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '90px' }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>Buna ziua,</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '1.5px', marginTop: '2px' }}>{displayName}</div>
        </div>
        <div onClick={() => navigate('/profile')} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
          {initials}
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '0 24px' }} />

      {/* Urmatoarea programare */}
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Urmatoarea programare</div>

        {loading ? (
          <div style={{ padding: '24px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '18px', color: 'rgba(255,255,255,0.28)', fontSize: '14px', textAlign: 'center' }}>Se incarca...</div>
        ) : nextAppt ? (
          <div style={{ background: 'linear-gradient(135deg, #2D1B69, #1A0E3A)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '18px', padding: '20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: `rgba(${nextAppt.status === 'confirmat' ? '34,197,94' : '239,68,68'},0.1)`, borderRadius: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor[nextAppt.status] }} />
                <span style={{ fontSize: '11px', fontWeight: '700', color: statusColor[nextAppt.status] }}>{statusLabel[nextAppt.status]}</span>
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>{formatDate(nextAppt.date, nextAppt.start_time)}</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff', letterSpacing: '1.5px', marginBottom: '4px' }}>{nextAppt.service?.name}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{nextAppt.service?.duration_min} min · {nextAppt.service?.price} lei</div>
            <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '14px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff' }}>CP</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Cristi Pintea</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>Apex Man · Vaslui</div>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => navigate('/booking')} style={{ padding: '24px', background: '#1E1635', border: '1px dashed rgba(139,92,246,0.25)', borderRadius: '18px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '8px' }}>Nicio programare activă</div>
            <div style={{ fontSize: '13px', color: '#A78BFA', fontWeight: '600' }}>+ Fă o programare</div>
          </div>
        )}
      </div>

      {/* Servicii */}
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Servicii disponibile</div>
        {services.length === 0 && !loading ? (
          <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px' }}>—</div>
        ) : services.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < services.length - 1 ? '1px solid rgba(139,92,246,0.08)' : 'none' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{s.duration_min} min</div>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#A78BFA' }}>{s.price} lei</div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#1E1635', borderTop: '1px solid rgba(139,92,246,0.15)', padding: '8px 0 20px', display: 'flex', alignItems: 'center', zIndex: 50 }}>
        {[['🏠','Home',true],['📅','Programare',false],['👤','Profil',false]].map(([icon, label, active], i) => (
          <div key={i} onClick={() => { if (label === 'Programare') navigate('/booking'); if (label === 'Profil') navigate('/profile'); }}
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

export default HomePage;
