import fs from 'fs';

const newCss = `@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  /* LIGHT PALETTE */
  --bg: #F8FAFC;
  --white: #FFFFFF;
  --s1: #FFFFFF;
  --s2: #F1F5F9;
  --s3: #E2E8F0;
  
  --bdr: rgba(15,23,42,0.08);
  --bdr2: rgba(15,23,42,0.12);

  --txt: #0F172A;
  --txt2: #475569;
  --txt3: #64748B;

  --or: #0EA5E9;
  --or2: #2563EB;
  --orb: rgba(14, 165, 233, 0.1);
  --orb2: rgba(14, 165, 233, 0.2);

  --bl: #7C3AED;
  --blb: rgba(124, 58, 237, 0.1);
  
  --gr: #10B981;
  --grb: rgba(16, 185, 129, 0.1);
  
  --am: #A855F7;
  --amb: rgba(168, 85, 247, 0.1);
  
  --rd: #EF4444;
  --rdb: rgba(239, 68, 68, 0.1);

  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --shadow2: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-glow: 0 0 24px rgba(14,165,233,0.15);
  
  --r8: 8px; --r12: 12px; --r16: 16px; --r20: 24px;
  --font: 'Plus Jakarta Sans', system-ui, sans-serif;
  
  --nav-bg: rgba(255, 255, 255, 0.85);
  --nav-mob-bg: rgba(248, 250, 252, 0.9);
  
  --btn-pri-bg: #0F172A;
  --btn-pri-text: #FFFFFF;
  --btn-pri-shadow: rgba(15, 23, 42, 0.15);
  --btn-pri-hover-bg: #1E293B;
  --btn-pri-hover-shadow: rgba(15, 23, 42, 0.25);
  
  --btn-sec-bg: #FFFFFF;
  --btn-sec-hover-bg: #F8FAFC;
  
  --card-bg: #FFFFFF;
  --modal-bg: #FFFFFF;
  --input-bg: #F8FAFC;
  --input-focus-bg: #FFFFFF;
  
  --overlay-light: rgba(15,23,42,0.02);
  --overlay-lighter: rgba(15,23,42,0.01);
  --overlay-border: rgba(15,23,42,0.06);
  --grid-line: rgba(15,23,42, 0.04);
  --section-line: rgba(15,23,42, 0.06);
  --text-inverse: #FFFFFF;
}

html.dark {
  /* DARK PALETTE */
  --bg: #0B0E14;
  --white: #131722;
  --s1: #131722;
  --s2: #1A202C;
  --s3: #222B3B;
  
  --bdr: rgba(255, 255, 255, 0.08);
  --bdr2: rgba(255, 255, 255, 0.12);

  --txt: #F1F5F9;
  --txt2: #94A3B8;
  --txt3: #64748B;

  --or: #38BDF8;
  --or2: #22D3EE;
  --orb: rgba(56, 189, 248, 0.1);
  --orb2: rgba(56, 189, 248, 0.2);

  --bl: #8B5CF6;
  --blb: rgba(139, 92, 246, 0.1);
  
  --gr: #34D399;
  --grb: rgba(52, 211, 153, 0.1);
  
  --am: #A855F7;
  --amb: rgba(168, 85, 247, 0.1);
  
  --rd: #F87171;
  --rdb: rgba(248, 113, 113, 0.1);

  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow2: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 32px rgba(56,189,248,0.1);
  
  --nav-bg: rgba(11, 14, 20, 0.75);
  --nav-mob-bg: rgba(11, 14, 20, 0.9);

  --btn-pri-bg: #F1F5F9;
  --btn-pri-text: #0B0E14;
  --btn-pri-shadow: rgba(255,255,255,0.05);
  --btn-pri-hover-bg: #FFFFFF;
  --btn-pri-hover-shadow: rgba(255,255,255,0.1);

  --btn-sec-bg: #1A202C;
  --btn-sec-hover-bg: #222B3B;
  
  --card-bg: rgba(19, 23, 34, 0.7);
  --modal-bg: #131722;
  --input-bg: rgba(0,0,0,0.2);
  --input-focus-bg: rgba(255,255,255,0.03);

  --overlay-light: rgba(255,255,255,0.03);
  --overlay-lighter: rgba(255,255,255,0.015);
  --overlay-border: rgba(255,255,255,0.08);
  --grid-line: rgba(255, 255, 255, 0.03);
  --section-line: rgba(255, 255, 255, 0.08);
  --text-inverse: #0B0E14;
}
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--font);
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s ease;
}
button, input, textarea, select { font-family: var(--font); }
* { -webkit-tap-highlight-color: transparent; }
.scroll-y { overflow-y: auto; -webkit-overflow-scrolling: touch; }
.scroll-x { overflow-x: auto; -webkit-overflow-scrolling: touch; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: var(--txt3); }

.hidden { display: none !important; }
.flex { display: flex; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap8 { gap: 8px; } .gap12 { gap: 12px; } .gap16 { gap: 16px; } .gap20 { gap: 20px; }
.tc { text-align: center; }
.txt2 { color: var(--txt2); } .txt3 { color: var(--txt3); }
.small { font-size: 13px; } .xsmall { font-size: 11px; }
.mt4 { margin-top: 4px; } .mt8 { margin-top: 8px; } .mt12 { margin-top: 12px; } .mt16 { margin-top: 16px; } .mt24 { margin-top: 24px; } .mt32 { margin-top: 32px; }
.mb8 { margin-bottom: 8px; } .mb12 { margin-bottom: 12px; } .mb16 { margin-bottom: 16px; }

.card { 
  background: var(--card-bg); 
  border: 1px solid var(--bdr); 
  border-radius: var(--r16); 
  box-shadow: var(--shadow); 
  backdrop-filter: blur(12px); 
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; 
}
.card:hover { border-color: var(--bdr2); box-shadow: var(--shadow2); }

.badge { 
  display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; 
  border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; 
  letter-spacing: .06em; 
}
.badge-sm { padding: 2px 8px; font-size: 10px; }
.badge-or { background: var(--orb); color: var(--or); border: 1px solid var(--orb2); }
.badge-bl { background: var(--blb); color: var(--bl); border: 1px solid rgba(139, 92, 246, 0.2); }
.badge-gr { background: var(--grb); color: var(--gr); border: 1px solid rgba(52, 211, 153, 0.2); }
.badge-rd { background: var(--rdb); color: var(--rd); border: 1px solid rgba(248, 113, 113, 0.2); }
.badge-am { background: var(--amb); color: var(--am); border: 1px solid rgba(168, 85, 247, 0.2); }
.badge-gray { background: var(--s2); color: var(--txt2); border: 1px solid var(--bdr); }

.btn { 
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; 
  padding: 10px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; 
  cursor: pointer; border: 1px solid transparent; 
  transition: all .2s cubic-bezier(0.16, 1, 0.3, 1); line-height: 1; 
}
.btn-primary { 
  background: var(--btn-pri-bg); color: var(--btn-pri-text); 
  box-shadow: 0 4px 12px var(--btn-pri-shadow); 
}
.btn-primary:hover { 
  transform: translateY(-2px); 
  background: var(--btn-pri-hover-bg); 
  box-shadow: 0 6px 16px var(--btn-pri-hover-shadow); 
}
.btn-primary:active { transform: translateY(0); }

.btn-cta { 
  background: linear-gradient(135deg, var(--or), var(--bl)); 
  color: #fff; box-shadow: 0 4px 20px rgba(56, 189, 248, 0.2); 
  border: 1px solid rgba(255,255,255,0.1); 
}
.btn-cta:hover { 
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.3); 
  filter: brightness(1.1); transform: translateY(-2px); 
}
.btn-cta-lg { padding: 14px 28px; font-size: 15px; }

.btn-secondary { 
  background: var(--btn-sec-bg); color: var(--txt); 
  border: 1px solid var(--bdr); backdrop-filter: blur(8px); 
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.btn-secondary:hover { 
  border-color: var(--bdr2); color: var(--txt); 
  background: var(--btn-sec-hover-bg); 
  transform: translateY(-1px);
}

.btn-ghost { background: transparent; color: var(--txt2); border: 1px solid transparent; }
.btn-ghost:hover { background: var(--s2); color: var(--txt); }
.btn-danger { background: var(--rdb); color: var(--rd); border: 1px solid rgba(248, 113, 113, 0.2); }
.btn-danger:hover { background: var(--rd); color: #fff; }
.btn-white { background: var(--bg); color: var(--or); font-weight: 700; border: 1px solid var(--bdr); }
.btn-white:hover { background: var(--s1); transform: translateY(-1px); }

.btn-sm { padding: 8px 16px; font-size: 13px; }
.btn-xs { padding: 6px 12px; font-size: 12px; }
.btn-lg { padding: 16px 32px; font-size: 15px; }
.btn-full { width: 100%; }

.btn-icon { 
  padding: 8px; border-radius: 50%; background: transparent; border: 1px solid transparent; 
  cursor: pointer; color: var(--txt3); transition: all .2s; 
  display: inline-flex; align-items: center; justify-content: center; font-size: 16px; 
}
.btn-icon:hover { background: var(--s2); color: var(--txt); border-color: var(--bdr); }

.input { 
  width: 100%; padding: 12px 16px; background: var(--input-bg); 
  border: 1px solid var(--bdr); border-radius: var(--r12); 
  font-size: 14px; color: var(--txt); outline: none; transition: all .2s; 
}
.input:hover { border-color: var(--bdr2); }
.input:focus { 
  border-color: var(--or); box-shadow: 0 0 0 3px var(--orb); 
  background: var(--input-focus-bg); 
}
.input::placeholder { color: var(--txt3); }
.textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

.form-group { margin-bottom: 20px; }
.form-label { 
  font-size: 12px; font-weight: 700; color: var(--txt2); 
  margin-bottom: 8px; display: block; text-transform: uppercase; 
  letter-spacing: 0.05em; 
}

/* MODAL */
.modal-overlay { 
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 500; 
  display: flex; align-items: center; justify-content: center; padding: 20px; 
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); 
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

.modal { 
  background: var(--modal-bg); border-radius: var(--r20); padding: 40px; 
  width: 100%; max-width: 440px; box-shadow: var(--shadow2), 0 0 0 1px var(--bdr); 
  animation: slideUp .3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; 
  transition: background-color 0.5s ease; color: var(--txt); 
}
@keyframes slideUp { from { transform: translateY(20px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
.modal-title { font-size: 24px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.5px; }
.modal-sub { font-size: 15px; color: var(--txt2); margin-bottom: 28px; }
.modal-close { 
  position: absolute; top: 16px; right: 16px; background: var(--s1); 
  border: 1px solid var(--bdr); width: 32px; height: 32px; border-radius: 50%; 
  cursor: pointer; font-size: 14px; display: flex; align-items: center; 
  justify-content: center; color: var(--txt2); transition: all 0.2s;
}
.modal-close:hover { background: var(--s2); color: var(--txt); transform: scale(1.05); }
.modal-switch { text-align: center; margin-top: 16px; font-size: 14px; color: var(--txt2); }
.modal-switch a { color: var(--or); font-weight: 600; cursor: pointer; transition: color 0.2s; }
.modal-switch a:hover { color: var(--or2); }

/* TOAST */
#toast-container { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
.toast-item { 
  background: #0B0E14; color: #F1F5F9; padding: 12px 20px; 
  border-radius: var(--r12); font-size: 14px; font-weight: 600; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1); 
  animation: toastIn .3s cubic-bezier(0.16, 1, 0.3, 1); 
  display: flex; align-items: center; gap: 10px; max-width: 340px; 
}
html.dark .toast-item { background: #FFFFFF; color: #000000; box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.5);  }
@keyframes toastIn { from { transform: translateX(20px) scale(0.95); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } }
.toast-success { border-left: 4px solid var(--gr); }
.toast-error { border-left: 4px solid var(--rd); }

/* MISC */
.avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; border: 1px solid var(--bdr); }
.av32 { width: 32px; height: 32px; font-size: 12px; }
.av40 { width: 40px; height: 40px; font-size: 14px; }
.av48 { width: 48px; height: 48px; font-size: 16px; }

/* NAV */
#main-nav { 
  position: sticky; top: 0; z-index: 300; background: var(--nav-bg); 
  border-bottom: 1px solid var(--bdr); backdrop-filter: blur(20px); 
  -webkit-backdrop-filter: blur(20px); transition: background-color 0.3s;
}
.nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.nav-logo { font-size: 20px; font-weight: 800; letter-spacing: -1px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.nav-logo span { color: var(--or); }
.nav-links { display: flex; gap: 4px; }
.nav-link { padding: 8px 14px; border-radius: 50px; font-size: 14px; font-weight: 600; color: var(--txt2); cursor: pointer; transition: all .2s; }
.nav-link:hover { background: var(--s2); color: var(--txt); }
.nav-link.active { background: var(--orb); color: var(--or); }
.nav-right { display: flex; align-items: center; gap: 12px; }
.notif-btn { position: relative; padding: 8px; border-radius: 50%; cursor: pointer; color: var(--txt2); transition: all .2s; background: transparent; border: 1px solid var(--bdr); font-size: 17px; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; }
.notif-btn:hover { background: var(--s2); color: var(--txt); border-color: var(--bdr2); }
.notif-badge { position: absolute; top: -4px; right: -4px; border-radius: 50%; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid var(--bg); width: 16px; height: 16px; }
.nav-avatar { width: 36px; height: 36px; font-size: 14px; cursor: pointer; border: 2px solid transparent; transition: border-color .2s; }
.nav-avatar:hover { border-color: var(--or); }
.hamburger { display: none; padding: 8px; cursor: pointer; font-size: 20px; border: none; background: none; color: var(--txt2); }

/* MOBILE NAV */
.mob-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: var(--nav-mob-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid var(--bdr); z-index: 200; padding: 10px 0 calc(10px + env(safe-area-inset-bottom)); box-shadow: 0 -4px 20px rgba(0,0,0,0.05); }
.mob-nav-inner { display: flex; justify-content: space-around; }
.mob-nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; padding: 4px 10px; color: var(--txt3); transition: all .2s; border: none; background: none; font-family: var(--font); }
.mob-nav-item:hover { color: var(--txt); }
.mob-nav-item.active { color: var(--or); }
.mob-ic { font-size: 20px; margin-bottom: 2px; } .mob-lbl { font-size: 11px; font-weight: 700; }

@media(max-width:900px){
  .nav-links { display: none; } .hamburger { display: flex; }
  .mob-nav { display: block; }
  body { padding-bottom: 80px; }
  .nav-right { gap: 8px; }
}
`;
fs.writeFileSync('/app/applet/src/index.css', newCss, 'utf8');
