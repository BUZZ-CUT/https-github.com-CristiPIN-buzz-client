import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>Buna ziua,</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '1.5px', marginTop: '2px' }}>Andrei N.</div>
        </div>
        <div onClick={() => navigate('/profile')} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>AN</div>
      </div>

      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '0 24px' }} />

      {/* Programare activa */}
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Urmatoarea programare</div>
        <div style={{ background: 'linear-gradient(135deg, #2D1B69, #1A0E3A)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '18px', padding: '20px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: 'rgba(34,197,94,0.1)', borderRadius: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#22C55E' }}>CONFIRMAT</span>
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>Maine · 13:00</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff', letterSpacing: '1.5px', marginBottom: '4px' }}>Tuns + Contur</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>45 min · 70 lei</div>
          <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '14px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff' }}>CP</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Cristi Pintea</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>Apex Man · Vaslui</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicii */}
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Servicii disponibile</div>
        {[['Tuns + Contur','45 min','70 lei'],['Tuns simplu','30 min','50 lei'],['Fade and Styling','60 min','90 lei'],['Barba + Contur','30 min','40 lei'],['Tuns + Barba','75 min','100 lei']].map(([name, dur, price], i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(139,92,246,0.08)' : 'none' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{dur}</div>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#A78BFA' }}>{price}</div>
          </div>
        ))}
      </div>

      {/* Istoric */}
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700' }}>Istoric programari</div>
        </div>
        {[['05','Iun','Tuns + Contur','45 min · 70 lei','Prezent','#22C55E'],['28','Mai','Tuns simplu','30 min · 50 lei','Prezent','#22C55E'],['02','Mai','Tuns + Barba','75 min · 100 lei','Neprezentat','#EF4444']].map(([zi, luna, srv, det, status, color], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{zi}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>{luna}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{srv}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{det}</div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color }}>{status}</div>
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