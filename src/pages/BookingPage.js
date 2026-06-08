import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  { name: 'Tuns + Contur', dur: '45 min', price: '70 lei' },
  { name: 'Tuns simplu', dur: '30 min', price: '50 lei' },
  { name: 'Fade and Styling', dur: '60 min', price: '90 lei' },
  { name: 'Barba + Contur', dur: '30 min', price: '40 lei' },
  { name: 'Tuns + Barba', dur: '75 min', price: '100 lei' },
];

const ore = ['13:00','13:30','14:30','15:30','16:00','17:00','17:30','18:30'];
const oreBusy = ['14:00','15:00','16:30','18:00'];

function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selSrv, setSelSrv] = useState(null);
  const [selDate, setSelDate] = useState(null);
  const [selOra, setSelOra] = useState(null);
  const [obs, setObs] = useState('');
  const [calM, setCalM] = useState(5);
  const [calY, setCalY] = useState(2026);

  const luni = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];

  const renderCal = () => {
    const pz = new Date(calY, calM, 1).getDay();
    const firstDay = pz === 0 ? 6 : pz - 1;
    const zl = new Date(calY, calM + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= zl; d++) days.push(d);
    return days;
  };

  const s = { background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 24px 40px', fontFamily: 'sans-serif' };
  const prog = (cur) => (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
      {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= cur ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />)}
    </div>
  );
  const btn = (label, disabled, onClick) => (
    <button onClick={onClick} disabled={disabled}
      style={{ width: '100%', padding: '16px', background: disabled ? 'rgba(139,92,246,0.3)' : '#8B5CF6', border: 'none', borderRadius: '14px', fontSize: '18px', letterSpacing: '3px', color: '#fff', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: '700', marginTop: 'auto' }}>
      {label}
    </button>
  );

  if (step === 1) return (
    <div style={s}>
      <div onClick={() => navigate('/home')} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {prog(1)}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 1 din 4</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 20px', fontWeight: '700' }}>Alege serviciul</h1>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {services.map((s2, i) => (
          <div key={i} onClick={() => setSelSrv(s2)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(139,92,246,0.08)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{s2.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '2px' }}>{s2.dur}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#A78BFA' }}>{s2.price}</div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid', borderColor: selSrv?.name === s2.name ? '#8B5CF6' : 'rgba(139,92,246,0.25)', background: selSrv?.name === s2.name ? '#8B5CF6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selSrv?.name === s2.name && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
              </div>
            </div>
          </div>
        ))}
      </div>
      {btn('CONTINUA', !selSrv, () => setStep(2))}
    </div>
  );

  if (step === 2) return (
    <div style={s}>
      <div onClick={() => setStep(1)} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {prog(2)}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 2 din 4</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 20px', fontWeight: '700' }}>Alege data</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div onClick={() => { if (calM > 0) setCalM(calM - 1); }} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '20px' }}>‹</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{luni[calM]} {calY}</div>
        <div onClick={() => { if (calM < 11) setCalM(calM + 1); }} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '20px' }}>›</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '6px' }}>
        {['L','M','M','J','V','S','D'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontWeight: '600', padding: '4px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', flex: 1 }}>
        {renderCal().map((d, i) => (
          <div key={i} onClick={() => d && setSelDate(d)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 0', cursor: d ? 'pointer' : 'default' }}>
            {d && <div style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: selDate === d ? '#fff' : 'rgba(255,255,255,0.55)', background: selDate === d ? '#8B5CF6' : 'transparent', border: d === 8 && selDate !== d ? '1.5px solid rgba(139,92,246,0.35)' : 'none' }}>{d}</div>}
          </div>
        ))}
      </div>
      {btn('CONTINUA', !selDate, () => setStep(3))}
    </div>
  );

  if (step === 3) return (
    <div style={s}>
      <div onClick={() => setStep(2)} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {prog(3)}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 3 din 4</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>Alege ora</h1>
      <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', marginBottom: '20px' }}>{selDate} {luni[calM]} {calY}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '20px' }}>
        {[...ore, ...oreBusy].sort().map((o, i) => {
          const busy = oreBusy.includes(o);
          const sel = selOra === o;
          return (
            <div key={i} onClick={() => !busy && setSelOra(o)}
              style={{ padding: '12px 8px', background: sel ? '#8B5CF6' : busy ? 'transparent' : '#1E1635', border: `1px solid ${sel ? '#8B5CF6' : busy ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.15)'}`, borderRadius: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: sel ? '#fff' : busy ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)', cursor: busy ? 'not-allowed' : 'pointer', textDecoration: busy ? 'line-through' : 'none' }}>
              {o}
            </div>
          );
        })}
      </div>
      {btn('CONTINUA', !selOra, () => setStep(4))}
    </div>
  );

  if (step === 4) return (
    <div style={s}>
      <div onClick={() => setStep(3)} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {prog(4)}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 4 din 4</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 20px', fontWeight: '700' }}>Confirmare</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: '#1E1635', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '14px', marginBottom: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#fff' }}>CP</div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Cristi Pintea</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '3px' }}>Apex Man Barber Shop · Vaslui</div>
        </div>
      </div>
      {[['Serviciu', selSrv?.name],['Data', `${selDate} ${luni[calM]} ${calY}`],['Ora', selOra],['Durata', selSrv?.dur],['Pret', selSrv?.price]].map(([lbl, val], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{lbl}</div>
          <div style={{ fontSize: '15px', fontWeight: '600', color: i === 4 ? '#A78BFA' : '#fff' }}>{val}</div>
        </div>
      ))}
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', fontWeight: '700', marginBottom: '10px' }}>Observatii <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', textTransform: 'none', letterSpacing: 0, fontWeight: '400' }}>(optional)</span></div>
        <textarea value={obs} onChange={e => setObs(e.target.value)}
          placeholder="Ex: voi intarzia 5 min..."
          style={{ width: '100%', padding: '12px 14px', background: 'transparent', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '12px', color: '#fff', fontFamily: 'sans-serif', fontSize: '14px', outline: 'none', resize: 'none', height: '72px', lineHeight: '1.6', boxSizing: 'border-box' }} />
      </div>
      {btn('CONFIRMA PROGRAMAREA', false, () => navigate('/booking-done', { state: { selSrv, selDate, luni: luni[calM], calY, selOra } }))}
    </div>
  );
}
export default BookingPage;