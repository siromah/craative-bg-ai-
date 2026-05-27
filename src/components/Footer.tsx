import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--bdr)', 
      background: 'var(--bg)',
      padding: '80px 24px 40px', 
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient blob */}
      <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '400px',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, var(--orb) 0%, transparent 70%)',
          opacity: 0.6, zIndex: 0, pointerEvents: 'none'
      }}></div>

      <div style={{maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 64, justifyContent: 'space-between', position: 'relative', zIndex: 1}}>
        
        <div style={{flex: '1 1 320px'}}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
            <img 
              src="/logo.png" 
              alt="AILABSBG" 
              style={{height: 48, borderRadius: '50%'}} 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = document.getElementById('footer-fallback');
                if (fb) fb.style.display = 'block';
              }} 
            />
            <div id="footer-fallback" style={{fontWeight: 800, fontSize: 24, letterSpacing: '-0.5px', color: 'var(--txt)', display: 'none'}}>
              AI<span style={{color: 'var(--or)'}}>LABS</span>BG
            </div>
          </div>
          <p style={{color: 'var(--txt2)', fontSize: 15, lineHeight: 1.6, maxWidth: 320, fontWeight: 500}}>
            AILABSBG е премиум AI общност и академия. Изграждаме бъдещето чрез автоматизация на бизнеса и практически AI системи.
          </p>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: 64, flex: '1 1 auto', justifyContent: 'flex-end'}}>
          <div style={{minWidth: 140}}>
            <h4 style={{fontSize: 13, fontWeight: 700, color: 'var(--txt)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20}}>Платформа</h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14}}>
               <li><Link to="/lessons" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Академия</Link></li>
               <li><Link to="/prompts" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Промпти</Link></li>
               <li><Link to="/community" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Общност</Link></li>
               <li><Link to="/events" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Събития</Link></li>
            </ul>
          </div>
          
          <div style={{minWidth: 140}}>
            <h4 style={{fontSize: 13, fontWeight: 700, color: 'var(--txt)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20}}>Правни</h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14}}>
               <li><Link to="/privacy" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Поверителност</Link></li>
               <li><Link to="/terms" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Условия за ползване</Link></li>
               <li><Link to="/cookie-policy" className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s'}}>Политика за бисквитки</Link></li>
               <li><span className="footer-link" style={{color: 'var(--txt2)', textDecoration: 'none', fontSize: 15, fontWeight: 500, cursor:'pointer', transition: 'color 0.2s'}} onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}>Настройки на бисквитки</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style={{maxWidth: 1200, margin: '64px auto 0', borderTop: '1px solid var(--bdr)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', color: 'var(--txt3)', fontSize: 13, position: 'relative', zIndex: 1}}>
        <span style={{fontWeight: 500}}>&copy; {new Date().getFullYear()} AILABSBG. Всички права запазени.</span>
        <span style={{fontSize: 12, opacity: 0.8}}>Платформата е прототип и не предоставя правни или финансови съвети.</span>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--txt) !important;
        }
      `}</style>
    </footer>
  );
}
