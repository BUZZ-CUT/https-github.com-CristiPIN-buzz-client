import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState('dark');

  return (
    <div style={{ background: theme === 'dark' ? '#0A0A0F' : '#F5F5F7', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', color: theme === 'dark' ? '#fff' : '#000', letterSpacing: '2px' }}>Profilul meu</div>
        <div onClick={() => navigate('/edit-profile')} style={{ fontSize: '14px', color: '#A78BFA', cursor: 'pointer', fontWeight: '600' }}>Editeaza</div>
      </div>
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '0 24px' }} />
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff' }}>AN</div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: theme === 'dark' ? '#fff' : '#000' }}>Andrei N.</div>
            <div style={{ fontSize: '13px', color: 'rgba(139,92,246,0.6)', marginTop: '3px' }}>+40 712 345 678</div>
          </div>
        </div>
      </div>
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.15)', margin: '22px 24px 0' }} />
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: theme === 'dark' ? '#fff' : '#000', fontWeight: '700', marginBottom: '14px' }}>Setari</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(139,92,246,0.08)', cursor: 'pointer' }}>
          <div style={{ fontSize: '15px', color: theme === 'dark' ? '#fff' : '#000', fontWeight: '500' }}>Schimba PIN</div>
          <span style={{ color: 'rgba(255,255,255,0.28)' }}>›</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div style={{ fontSize: '15px', color: theme === 'dark' ? '#fff' : '#000', fontWeight: '500' }}>Tema</div>
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
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: theme === 'dark' ? '#fff' : '#000', fontWeight: '700', marginBottom: '14px' }}>Istoric programari</div>
        {[['05','Iun','Tuns + Contur','45 min · 70 lei','Prezent','#22C55E'],['28','Mai','Tuns simplu','30 min · 50 lei','Prezent','#22C55E'],['02','Mai','Tuns + Barba','75 min · 100 lei','Neprezentat','#EF4444']].map(([zi, luna, srv, det, status, color], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{zi}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>{luna}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: theme === 'dark' ? '#fff' : '#000' }}>{srv}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{det}</div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color }}>{status}</div>
          </div>
        ))}
        <button onClick={() => navigate('/welcome')}
          style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', fontSize: '15px', letterSpacing: '2px', color: '#EF4444', cursor: 'pointer', marginTop: '22px' }}>
          DECONECTEAZA-TE
        </button>
      </div>
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