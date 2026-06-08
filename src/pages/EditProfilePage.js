import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const navigate = useNavigate();
  const [prenume, setPrenume] = useState('Andrei');
  const [nume, setNume] = useState('N.');
  const [ig, setIg] = useState('andrei.n');
  const [fb, setFb] = useState('');
  const [tt, setTt] = useState('');

  const inp = { width: '100%', padding: '13px 16px', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', color: '#fff', fontFamily: 'sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '48px 24px 14px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
        <div onClick={() => navigate('/profile')} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '22px' }}>←</div>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '2px' }}>Editeaza profilul</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 120px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#fff' }}>AN</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%', background: '#8B5CF6', border: '2px solid #0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>✏️</div>
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>Apasa pentru a schimba poza</div>
        </div>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Informatii personale</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div><div style={{ fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>Prenume</div><input style={inp} value={prenume} onChange={e => setPrenume(e.target.value)} /></div>
            <div><div style={{ fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>Nume</div><input style={inp} value={nume} onChange={e => setNume(e.target.value)} /></div>
          </div>
        </div>
        <div style={{ height: '1px', background: 'rgba(139,92,246,0.1)' }} />
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '4px' }}>Numar de telefon</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)' }}>+40 712 345 678</div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', background: 'rgba(139,92,246,0.1)', padding: '3px 10px', borderRadius: '6px' }}>Nu se poate modifica</div>
          </div>
        </div>
        <div style={{ height: '1px', background: 'rgba(139,92,246,0.1)' }} />
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Linkuri sociale</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[['#E1306C','Instagram',ig,setIg,'username'],['#1877F2','Facebook',fb,setFb,'profil.tau'],['rgba(255,255,255,0.55)','TikTok',tt,setTt,'@username']].map(([color, label, val, setVal, ph]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '13px 14px', fontSize: '12px', fontWeight: '700', color, borderRight: '1px solid rgba(139,92,246,0.18)', whiteSpace: 'nowrap' }}>{label}</div>
                <input value={val} onChange={e => setVal(e.target.value)} placeholder={ph}
                  style={{ flex: 1, padding: '13px 16px', background: 'transparent', border: 'none', color: '#fff', fontFamily: 'sans-serif', fontSize: '14px', outline: 'none' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 24px 28px', borderTop: '1px solid rgba(139,92,246,0.1)', background: '#0A0A0F', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => navigate('/profile')}
          style={{ width: '280px', height: '52px', background: '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '17px', letterSpacing: '3px', color: '#fff', cursor: 'pointer', fontWeight: '700' }}>
          SALVEAZA
        </button>
      </div>
    </div>
  );
}
export default EditProfilePage;