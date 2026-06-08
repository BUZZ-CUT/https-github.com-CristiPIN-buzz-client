import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#0A0A0F',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Fundal gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 25%, rgba(139,92,246,0.25) 0%, transparent 65%)'
      }} />

      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%'
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: '60px',
          letterSpacing: '8px',
          margin: 0,
          fontWeight: '700'
        }}>BUZZ</h1>
        <p style={{
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '2px',
          fontSize: '13px',
          marginTop: '6px'
        }}>Programari inteligente</p>
      </div>

      {/* Butoane */}
      <div style={{
        padding: '0 28px 52px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        zIndex: 1
      }}>
        <button
          onClick={() => navigate('/register')}
          style={{
            width: '100%',
            padding: '16px',
            background: '#8B5CF6',
            border: 'none',
            borderRadius: '14px',
            fontSize: '18px',
            letterSpacing: '3px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '700'
          }}>
          CREEAZA CONT
        </button>

        <button
          onClick={() => navigate('/login')}
          style={{
            width: '100%',
            padding: '16px',
            background: 'transparent',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '14px',
            fontSize: '18px',
            letterSpacing: '3px',
            color: 'rgba(255,255,255,0.55)',
            cursor: 'pointer',
            fontWeight: '700'
          }}>
          AM DEJA CONT
        </button>

        <p style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.28)',
          textAlign: 'center',
          lineHeight: '1.6',
          margin: 0
        }}>
          Continuand, esti de acord cu{' '}
          <span style={{ color: '#A78BFA' }}>Termenii</span>{' '}
          si{' '}
          <span style={{ color: '#A78BFA' }}>Politica de confidentialitate</span>
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;