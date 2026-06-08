import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      background: 'radial-gradient(ellipse at center, #1A0A3A 0%, #0A0A0F 70%)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '72px',
        letterSpacing: '8px',
        margin: 0,
        fontWeight: '700'
      }}>BUZZ</h1>
      <p style={{
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '3px',
        fontSize: '12px',
        marginTop: '8px',
        textTransform: 'uppercase'
      }}>Programari Frizerie</p>
    </div>
  );
}

export default SplashScreen;