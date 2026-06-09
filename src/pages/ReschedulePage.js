import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSession } from '../services/session';
import { getBusySlots, getWorkSchedule, rescheduleAppointment } from '../services/bookingService';

function ReschedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getSession();
  const { appointmentId, service } = location.state || {};

  const [step, setStep] = useState(1);
  const [selDate, setSelDate] = useState(null);
  const [selOra, setSelOra] = useState(null);
  const [calM, setCalM] = useState(new Date().getMonth());
  const [calY, setCalY] = useState(new Date().getFullYear());
  const [busySlots, setBusySlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const luni = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];

  useEffect(() => {
    if (!user || !appointmentId) { navigate('/home'); return; }
    getWorkSchedule().then(setSchedule).catch(console.error);
  }, []);

  useEffect(() => {
    if (selDate !== null) {
      const dateStr = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(selDate).padStart(2, '0')}`;
      getBusySlots(dateStr).then(setBusySlots).catch(console.error);
    }
  }, [selDate, calM, calY]);

  const generateSlots = () => {
    if (!selDate) return [];
    const d = new Date(calY, calM, selDate);
    const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
    const day = schedule.find(s => s.day_of_week === dow);
    if (!day || !day.is_open) return [];
    const slots = [];
    const [sh, sm] = day.start_time.split(':').map(Number);
    const [eh, em] = day.end_time.split(':').map(Number);
    let cur = sh * 60 + sm;
    const end = eh * 60 + em;
    while (cur + (service?.duration_min || 30) <= end) {
      const h = String(Math.floor(cur / 60)).padStart(2, '0');
      const m = String(cur % 60).padStart(2, '0');
      slots.push(`${h}:${m}`);
      cur += 30;
    }
    return slots;
  };

  const isSlotBusy = (slot) => {
    if (!service) return false;
    const [sh, sm] = slot.split(':').map(Number);
    const slotStart = sh * 60 + sm;
    const slotEnd = slotStart + service.duration_min;
    return busySlots.some(b => {
      const [bsh, bsm] = b.start_time.split(':').map(Number);
      const [beh, bem] = b.end_time.split(':').map(Number);
      return slotStart < (beh * 60 + bem) && slotEnd > (bsh * 60 + bsm);
    });
  };

  const isPastDate = (d) => {
    const today = new Date(); today.setHours(0,0,0,0);
    return new Date(calY, calM, d) < today;
  };

  const renderCal = () => {
    const pz = new Date(calY, calM, 1).getDay();
    const firstDay = pz === 0 ? 6 : pz - 1;
    const zl = new Date(calY, calM + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= zl; d++) days.push(d);
    return days;
  };

  const handleConfirm = async () => {
    setSaving(true);
    setError('');
    try {
      const dateStr = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(selDate).padStart(2, '0')}`;
      const [sh, sm] = selOra.split(':').map(Number);
      const endMin = sh * 60 + sm + service.duration_min;
      const endTime = `${String(Math.floor(endMin / 60)).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`;
      await rescheduleAppointment(appointmentId, { date: dateStr, startTime: selOra, endTime });
      navigate('/booking-done', {
        state: {
          selSrv: { name: service.name, dur: `${service.duration_min} min`, price: `${service.price} lei` },
          selDate, luni: luni[calM], calY, selOra, isReschedule: true,
        },
      });
    } catch (err) {
      setError(err.message || 'Eroare la reprogramare. Încearcă din nou.');
    } finally {
      setSaving(false);
    }
  };

  const s = { background: '#0A0A0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 24px 40px', fontFamily: 'sans-serif' };
  const prog = (cur) => (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
      {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= cur ? '#8B5CF6' : 'rgba(139,92,246,0.15)' }} />)}
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
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 1 din 3</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 4px', fontWeight: '700' }}>Reprogramare</h1>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', margin: '0 0 20px' }}>{service?.name} · {service?.duration_min} min</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div onClick={() => { const d = new Date(calY, calM - 1); setCalM(d.getMonth()); setCalY(d.getFullYear()); setSelDate(null); }} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '20px' }}>‹</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{luni[calM]} {calY}</div>
        <div onClick={() => { const d = new Date(calY, calM + 1); setCalM(d.getMonth()); setCalY(d.getFullYear()); setSelDate(null); }} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '20px' }}>›</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '6px' }}>
        {['L','M','M','J','V','S','D'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontWeight: '600', padding: '4px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', flex: 1 }}>
        {renderCal().map((d, i) => {
          const past = d && isPastDate(d);
          const dow = d ? (new Date(calY, calM, d).getDay() === 0 ? 6 : new Date(calY, calM, d).getDay() - 1) : -1;
          const daySchedule = schedule.find(s2 => s2.day_of_week === dow);
          const closed = d && daySchedule && !daySchedule.is_open;
          const disabled = past || closed;
          return (
            <div key={i} onClick={() => d && !disabled && setSelDate(d)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 0', cursor: d && !disabled ? 'pointer' : 'default' }}>
              {d && <div style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: disabled ? 'rgba(255,255,255,0.15)' : selDate === d ? '#fff' : 'rgba(255,255,255,0.55)', background: selDate === d ? '#8B5CF6' : 'transparent' }}>{d}</div>}
            </div>
          );
        })}
      </div>
      {btn('CONTINUA', !selDate, () => setStep(2))}
    </div>
  );

  if (step === 2) {
    const slots = generateSlots();
    return (
      <div style={s}>
        <div onClick={() => setStep(1)} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
        {prog(2)}
        <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 2 din 3</div>
        <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 8px', fontWeight: '700' }}>Alege ora</h1>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', marginBottom: '20px' }}>{selDate} {luni[calM]} {calY}</p>
        {slots.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '14px', textAlign: 'center', marginTop: '32px' }}>Nicio ora disponibila in aceasta zi.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '20px' }}>
            {slots.map((o) => {
              const busy = isSlotBusy(o);
              const sel = selOra === o;
              return (
                <div key={o} onClick={() => !busy && setSelOra(o)}
                  style={{ padding: '12px 8px', background: sel ? '#8B5CF6' : busy ? 'transparent' : '#1E1635', border: `1px solid ${sel ? '#8B5CF6' : busy ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.15)'}`, borderRadius: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: sel ? '#fff' : busy ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)', cursor: busy ? 'not-allowed' : 'pointer', textDecoration: busy ? 'line-through' : 'none' }}>
                  {o}
                </div>
              );
            })}
          </div>
        )}
        {btn('CONTINUA', !selOra, () => setStep(3))}
      </div>
    );
  }

  return (
    <div style={s}>
      <div onClick={() => setStep(2)} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', marginBottom: '32px', fontSize: '22px' }}>←</div>
      {prog(3)}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', marginBottom: '8px', textTransform: 'uppercase' }}>Pasul 3 din 3</div>
      <h1 style={{ color: '#fff', fontSize: '28px', letterSpacing: '2px', margin: '0 0 20px', fontWeight: '700' }}>Confirmare</h1>
      {[['Serviciu', service?.name], ['Data nouă', `${selDate} ${luni[calM]} ${calY}`], ['Ora nouă', selOra], ['Durata', `${service?.duration_min} min`], ['Preț', `${service?.price} lei`]].map(([lbl, val], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{lbl}</div>
          <div style={{ fontSize: '15px', fontWeight: '600', color: i === 4 ? '#A78BFA' : '#fff' }}>{val}</div>
        </div>
      ))}
      {error && <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>{error}</p>}
      {btn(saving ? 'SE SALVEAZĂ...' : 'CONFIRMĂ REPROGRAMAREA', saving, handleConfirm)}
    </div>
  );
}

export default ReschedulePage;
