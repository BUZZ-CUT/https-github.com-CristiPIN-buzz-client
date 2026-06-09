import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, saveSession } from '../services/session';
import { updateProfile } from '../services/authService';

function EditProfilePage() {
  const navigate = useNavigate();
  const user = getSession();
  const [prenume, setPrenume] = useState(user?.prenume || '');
  const [nume, setNume] = useState(user?.name || '');
  const [ig, setIg] = useState(user?.instagram || '');
  const [fb, setFb] = useState(user?.facebook || '');
  const [tt, setTt] = useState(user?.tiktok || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const inp = { width: '100%', padding: '13px 16px', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', color: '#fff', fontFamily: 'sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };

  const handleSave = async () => {
    if (!prenume || !nume) { setError('Prenumele și numele sunt obligatorii.'); return; }
    setSaving(true);
    setError('');
    try {
      const updated = await updateProfile({
        prenume,
        name: nume,
        instagram: ig || null,
        facebook: fb || null,
        tiktok: tt || null,
      });
      saveSession({ ...user, ...updated });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('Eroare la salvare. Încearcă din nou.');
    } finally {
      setSaving(false);
    }
  };

  const initials = `${(prenume || '')[0] || ''}${(nume || '')[0] || ''}`.toUpperCase();

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '48px 24px 14px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
        <div onClick={() => navigate('/profile')} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '22px' }}>←</div>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '2px' }}>Editeaza profilul</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 120px', display: 'flex', flexDirection: 'column', gap: '22px' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#fff' }}>{initials}</div>
        </div>

        {/* Informatii */}
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '14px' }}>Informatii personale</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>Prenume</div>
              <input style={inp} value={prenume} onChange={e => setPrenume(e.target.value)} />
            </div>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>Nume</div>
              <input style={inp} value={nume} onChange={e => setNume(e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(139,92,246,0.1)' }} />

        {/* Telefon readonly */}
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '4px' }}>Numar de telefon</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)' }}>{user?.phone}</div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', background: 'rgba(139,92,246,0.1)', padding: '3px 10px', borderRadius: '6px' }}>Nu se poate modifica</div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(139,92,246,0.1)' }} />

        {/* Social */}
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

        {error && <p style={{ color: '#EF4444', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
      </div>

      <div style={{ padding: '12px 24px 28px', borderTop: '1px solid rgba(139,92,246,0.1)', background: '#0A0A0F', display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSave} disabled={saving}
          style={{ width: '280px', height: '52px', background: saving ? 'rgba(139,92,246,0.3)' : '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '17px', letterSpacing: '3px', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: '700' }}>
          {saving ? 'SE SALVEAZA...' : 'SALVEAZA'}
        </button>
      </div>
    </div>
  );
}

export default EditProfilePage;
