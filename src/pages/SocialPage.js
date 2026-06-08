import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SocialPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const [ig, setIg] = useState('');
  const [fb, setFb] = useState('');
  const [tt, setTt] = useState('');

  const socialField = (color, label, val, setVal, placeholder) => (
    <div style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
      <div style={{ padding: '13px 14px', fontSize: '12px', fontWeight: '700', color, borderRight: '1px solid rgba(139,92,246,0.18)', whiteSpace: 'nowrap' }}>{label}</div>
      <input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, padding: '13px 16px', background: 'transparent', border: 'none', color: '#fff', fontFamily: 'sans-serif', fontSize: '14px', outline: 'none' }} />
    </div>
  );

  return (
    <div style={{ background: '#0A0A0F', height: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 28px 40px', fontFamily: 'sans-serif' }}>
      <div onClick={() => navigate('/name', { state })} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= 3 ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />)}
      </div>
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 4 din 5</div>
      <h1 style={{ color: '#fff', fontSize: '34px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>Linkuri<br />sociale</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>Optional — vizibile pentru frizer.</p>
      {socialField('#E1306C', 'Instagram', ig, setIg, 'username')}
      {socialField('#1877F2', 'Facebook', fb, setFb, 'profil.tau')}
      {socialField('rgba(255,255,255,0.55)', 'TikTok', tt, setTt, '@username')}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => navigate('/pin-set', { state: { ...state, ig, fb, tt } })}
          style={{ width: '100%', padding: '16px', background: '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: 'pointer', fontWeight: '700' }}>
          CONTINUA
        </button>
        <button onClick={() => navigate('/pin-set', { state })}
          style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.28)', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
          Sari peste acest pas
        </button>
      </div>
    </div>
  );
}
export default SocialPage;