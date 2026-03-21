import { Link } from 'react-router-dom'
import { useState } from 'react'

/* ─────────────────────────────────────────
   SVG inline helpers
───────────────────────────────────────── */
const LogoMark = () => (
  <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
    <circle cx="5" cy="5" r="3" stroke="#F4F2FF" strokeWidth="1.2"/>
    <circle cx="13" cy="6" r="2.5" stroke="#B8AEED" strokeWidth="1.2"/>
    <path d="M9 10Q7 13 7 17" stroke="#F4F2FF" strokeWidth="1" strokeLinecap="round"/>
    <path d="M9 10Q11 13 11 17" stroke="#B8AEED" strokeWidth="1" strokeLinecap="round"/>
    <path d="M8.5 9Q9.5 8 10.5 9" stroke="#E8D8FF" strokeWidth=".8" strokeLinecap="round"/>
  </svg>
)

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M4 12C4 7.6 7.6 4 12 4s8 3.6 8 8-3.6 8-8 8H4.5L2.5 22" stroke="#4A3F8C" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="12" r="1" fill="#4A3F8C"/>
    <circle cx="12" cy="12" r="1" fill="#4A3F8C"/>
    <circle cx="15" cy="12" r="1" fill="#4A3F8C"/>
  </svg>
)

const IconLearn = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M4 6h16M4 10h12M4 14h14M4 18h10" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconContact = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M5 5h14v10H13L10 18v-3H5V5z" stroke="#993556" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M3.18 23.76c.38.22.82.28 1.25.16l12.35-7.13-2.78-2.78-10.82 9.75zM.5 1.4C.19 1.79 0 2.34 0 3.06v17.88c0 .72.19 1.27.5 1.66l.09.09 10.02-10.02v-.24L.59 1.31.5 1.4zM20.96 10.23l-2.85-1.65-3.13 3.12 3.13 3.13 2.87-1.66c.82-.47.82-1.47-.02-1.94zM4.43.08L16.78 7.2 14 9.97 3.18.23C3.56.1 4 .16 4.43.08z"/>
  </svg>
)

/* ─────────────────────────────────────────
   STORE BADGE component — ambas próximamente
───────────────────────────────────────── */
function StoreBadge({ store }) {
  const isApple = store === 'apple'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: '#111',
        color: '#fff',
        border: '1.5px solid #2a2a2a',
        borderRadius: '10px',
        padding: '9px 18px',
        minWidth: '148px',
        opacity: 0.5,
        cursor: 'not-allowed',
      }}
    >
      <span style={{ flexShrink: 0, lineHeight: 0 }}>
        {isApple ? <AppleIcon /> : <GooglePlayIcon />}
      </span>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: '9px', opacity: 0.7, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.5px' }}>
          Próximamente
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>
          {isApple ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PHONE FRAME — fiel al prototipo S2 Home
───────────────────────────────────────── */
const PhoneSVGLogo = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
    <circle cx="4" cy="4" r="2.5" stroke="#F4F2FF" strokeWidth="1"/>
    <circle cx="10" cy="5" r="2" stroke="#B8AEED" strokeWidth="1"/>
    <path d="M7 8Q5 10 5 13" stroke="#F4F2FF" strokeWidth=".9" strokeLinecap="round"/>
    <path d="M7 8Q9 10 9 13" stroke="#B8AEED" strokeWidth=".9" strokeLinecap="round"/>
    <path d="M6.5 7.5Q7.5 6.5 8.5 7.5" stroke="#E8D8FF" strokeWidth=".7" strokeLinecap="round"/>
  </svg>
)
const NavIconHome = ({ active }) => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
    <path d="M2 8L8 2l6 6M4 8v5h8V8" stroke={active ? '#B8AEED' : '#7B6FCC'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const NavIconHistory = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
    <circle cx="8" cy="8" r="5.5" stroke="#7B6FCC" strokeWidth="1.2"/>
    <path d="M8 5.5v2.5l1.5 1" stroke="#7B6FCC" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)
const NavIconProfile = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
    <circle cx="8" cy="6" r="2.5" stroke="#7B6FCC" strokeWidth="1.2"/>
    <path d="M2.5 13.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="#7B6FCC" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

function MiniPhone() {
  const ph = { // phone pixel scale — matches prototipo
    width: 320,
    height: 650,
  }
  // We display at ~280px wide, scaling everything proportionally
  const scale = 0.875

  return (
    <div style={{
      width: ph.width * scale,
      height: ph.height * scale,
      background: 'var(--blanco)',
      borderRadius: 36 * scale,
      border: `${7 * scale}px solid #3d3470`,
      outline: `${2 * scale}px solid rgba(184,174,237,0.35)`,
      outlineOffset: `${3 * scale}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      flexShrink: 0,
      boxShadow: '0 32px 80px rgba(30,22,64,.55), 0 8px 24px rgba(30,22,64,.3)',
    }}>

      {/* ── Phone Header ── */}
      <div style={{
        background: 'var(--noche)',
        padding: `${16*scale}px ${18*scale}px ${12*scale}px`,
        display: 'flex', alignItems: 'center', gap: 10*scale,
        flexShrink: 0,
      }}>
        <div style={{
          width: 26*scale, height: 26*scale,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <img
            src="/icono.png"
            alt="Susurra"
            style={{ width: 26*scale, height: 26*scale, objectFit: 'contain', filter: 'drop-shadow(0 1px 3px rgba(123,111,204,0.6))' }}
          />
        </div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15*scale, color: 'var(--blanco)', lineHeight: 1.2 }}>Susurra</div>
          <div style={{ fontSize: 9*scale, color: 'var(--lavanda)' }}>tu espacio seguro</div>
        </div>
        <span style={{
          marginLeft: 'auto',
          background: 'var(--purpura)', color: 'var(--lav-l)',
          fontSize: 9*scale, padding: `${3*scale}px ${8*scale}px`, borderRadius: 10,
        }}>anónimo</span>
      </div>

      {/* ── Phone Body ── */}
      <div style={{
        flex: 1, padding: `${18*scale}px ${16*scale}px`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        gap: 12*scale, background: 'var(--blanco)',
      }}>
        {/* Greeting */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18*scale, color: 'var(--noche)', lineHeight: 1.2 }}>
            Hola, <span style={{ color: 'var(--purpura)' }}>estamos aquí.</span>
          </div>
          <div style={{ fontSize: 11*scale, color: 'var(--muted)', marginTop: 4 }}>¿Qué necesitas hoy?</div>
        </div>

        {/* Section label */}
        <div style={{ fontSize: 9*scale, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
          ¿cómo podemos ayudarte?
        </div>

        {/* Card — Pedir ayuda */}
        <div style={{ background: 'var(--violeta)', borderRadius: 20*scale, padding: `${14*scale}px ${16*scale}px`, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10*scale, marginBottom: 5*scale }}>
            <div style={{ width: 30*scale, height: 30*scale, borderRadius: '50%', background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 15 15" fill="none" width={15*scale} height={15*scale}>
                <path d="M2 7.5C2 5 4 3 7.5 3s5.5 2 5.5 4.5-2.5 4.5-5.5 4.5H2.5L1.5 14" stroke="#F4F2FF" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="5.5" cy="7.5" r=".7" fill="#F4F2FF"/>
                <circle cx="7.5" cy="7.5" r=".7" fill="#F4F2FF"/>
                <circle cx="9.5" cy="7.5" r=".7" fill="#F4F2FF"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 13*scale, fontWeight: 600, color: '#F4F2FF', margin: 0 }}>Pedir ayuda</h3>
          </div>
          <p style={{ fontSize: 10*scale, lineHeight: 1.4, color: '#B8AEED', margin: 0, opacity: .85 }}>Cuéntanos lo que está pasando. Te escuchamos sin juzgar.</p>
        </div>

        {/* Card — Aprender */}
        <div style={{ background: 'var(--azul-l)', borderRadius: 20*scale, padding: `${14*scale}px ${16*scale}px`, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10*scale, marginBottom: 5*scale }}>
            <div style={{ width: 30*scale, height: 30*scale, borderRadius: '50%', background: 'rgba(56,138,221,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 15 15" fill="none" width={15*scale} height={15*scale}>
                <path d="M2 4h11M2 7.5h7M2 11h9" stroke="#185FA5" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 13*scale, fontWeight: 600, color: '#0C447C', margin: 0 }}>Aprender</h3>
          </div>
          <p style={{ fontSize: 10*scale, lineHeight: 1.4, color: '#185FA5', margin: 0, opacity: .85 }}>Tus derechos, salud sexual y cómo protegerte.</p>
        </div>

        {/* Card — Contactar */}
        <div style={{ background: 'var(--rosa-l)', borderRadius: 20*scale, padding: `${14*scale}px ${16*scale}px`, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10*scale, marginBottom: 5*scale }}>
            <div style={{ width: 30*scale, height: 30*scale, borderRadius: '50%', background: 'rgba(212,168,212,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 15 15" fill="none" width={15*scale} height={15*scale}>
                <path d="M3 3h9v7.5H8.5L6 12.5v-2H3V3z" stroke="#993556" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 13*scale, fontWeight: 600, color: '#72243E', margin: 0 }}>Contactar a alguien</h3>
          </div>
          <p style={{ fontSize: 10*scale, lineHeight: 1.4, color: '#993556', margin: 0, opacity: .85 }}>Líneas de ayuda y servicios cerca de ti.</p>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        background: 'var(--noche)',
        padding: `${10*scale}px ${8*scale}px ${12*scale}px`,
        display: 'flex', justifyContent: 'space-around', flexShrink: 0,
      }}>
        {/* Inicio — active */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3*scale, opacity: 1 }}>
          <NavIconHome active />
          <span style={{ fontSize: 9*scale, color: 'var(--lavanda)' }}>Inicio</span>
          <div style={{ width: 4*scale, height: 4*scale, borderRadius: '50%', background: 'var(--purpura)' }} />
        </div>
        {/* Historial */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3*scale, opacity: .45 }}>
          <NavIconHistory />
          <span style={{ fontSize: 9*scale, color: 'var(--lavanda)' }}>Historial</span>
        </div>
        {/* Perfil */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3*scale, opacity: .45 }}>
          <NavIconProfile />
          <span style={{ fontSize: 9*scale, color: 'var(--lavanda)' }}>Perfil</span>
        </div>
      </div>

    </div>
  )
}

/* ─────────────────────────────────────────
   CHAT DEMO WINDOW
───────────────────────────────────────── */
function ChatDemoWindow() {
  return (
    <div style={{
      width: 'clamp(280px, 35vw, 380px)',
      background: 'var(--blanco)',
      borderRadius: 24,
      border: '1px solid var(--lavanda)',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{ background: 'var(--noche)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="/terry-bicolor.png"
          alt="Susurra"
          style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 1px 4px rgba(123,111,204,0.6))' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: 'var(--blanco)' }}>Susurra</div>
          <div style={{ fontSize: 10, color: 'var(--menta)' }}>● en línea contigo</div>
        </div>
        <span style={{ background: 'var(--purpura)', color: 'var(--lav-l)', fontSize: 9, padding: '3px 8px', borderRadius: 10 }}>anónimo</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ alignSelf: 'flex-start', background: 'var(--lav-l)', border: '.5px solid var(--lavanda)', borderRadius: '4px 16px 16px 16px', padding: '9px 12px', maxWidth: '88%', fontSize: 13, color: 'var(--texto)', lineHeight: 1.5 }}>
          Hola. Todo lo que me cuentes es <strong style={{ color: 'var(--violeta)' }}>anónimo</strong>. ¿Qué está pasando?
        </div>
        <div style={{ alignSelf: 'flex-end', background: 'var(--violeta)', borderRadius: '16px 4px 16px 16px', padding: '9px 12px', maxWidth: '82%', fontSize: 13, color: 'var(--blanco)', lineHeight: 1.5 }}>
          Alguien me manda mensajes raros y me da miedo
        </div>
        <div style={{ alignSelf: 'flex-start', background: 'var(--lav-l)', border: '.5px solid var(--lavanda)', borderRadius: '4px 16px 16px 16px', padding: '9px 12px', maxWidth: '88%', fontSize: 13, color: 'var(--texto)', lineHeight: 1.5 }}>
          Gracias por contarme. ¿Esa persona te pide algo o te hace sentir presionada?
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {['Sí, me pide cosas', 'Me amenaza', 'No sé cómo explicarlo'].map(pill => (
              <span key={pill} style={{ border: '1px solid var(--lavanda)', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: 'var(--violeta)', background: 'var(--blanco)', cursor: 'pointer' }}>{pill}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--noche)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,.08)', borderRadius: 20, padding: '9px 14px', fontSize: 13, color: 'rgba(255,255,255,.35)' }}>Escribe aquí...</div>
        <div style={{ width: 32, height: 32, background: 'var(--purpura)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <svg viewBox="0 0 15 15" fill="none" width="15" height="15"><path d="M2 7.5h11M8.5 3l4 4.5-4 4.5" stroke="#F4F2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN PORTAL COMPONENT
───────────────────────────────────────── */
export default function Portal() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --noche:   #1E1640;
          --violeta: #4A3F8C;
          --purpura: #7B6FCC;
          --lavanda: #B8AEED;
          --lav-l:   #E8E4FA;
          --azul:    #85B7EB;
          --azul-l:  #C4D8F5;
          --azul-ll: #EBF4FD;
          --rosa:    #D4A8D4;
          --rosa-l:  #F2E4F2;
          --menta:   #A8DDD0;
          --blanco:  #F4F2FF;
          --texto:   #2A2050;
          --muted:   #7B6FCC;
        }
        .portal-root { font-family: 'DM Sans', sans-serif; background: var(--blanco); min-height: 100vh; }

        /* NAV */
        .portal-nav {
          background: var(--noche);
          padding: 0 clamp(16px, 4vw, 48px);
          display: flex; align-items: center; gap: 16px; height: 72px;
          position: sticky; top: 0; z-index: 100;
        }
        .portal-nav-links { display: flex; align-items: center; gap: 24px; margin-left: auto; }
        .portal-nav-links a { color: var(--lavanda); text-decoration: none; font-size: 14px; transition: color .2s; }
        .portal-nav-links a:hover { color: var(--blanco); }
        .portal-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; margin-left: auto; }
        .portal-hamburger span { width: 22px; height: 2px; background: var(--lavanda); border-radius: 2px; display: block; transition: all .3s; }
        .portal-mob-menu {
          display: none; flex-direction: column; background: var(--noche);
          padding: 16px 24px; gap: 16px; border-top: 1px solid rgba(255,255,255,.1);
        }
        .portal-mob-menu.open { display: flex; }
        .portal-mob-menu a { color: var(--lavanda); text-decoration: none; font-size: 16px; padding: 4px 0; }

        /* HERO */
        .portal-hero {
          background: var(--noche);
          padding: clamp(40px, 8vw, 80px) clamp(16px, 4vw, 48px) clamp(40px, 8vw, 72px);
          display: flex; align-items: center; gap: clamp(24px, 5vw, 60px); flex-wrap: wrap;
        }
        .portal-hero-text { flex: 1; min-width: 280px; }
        .portal-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 6vw, 52px);
          color: var(--blanco); line-height: 1.15; margin-bottom: 16px;
        }
        .portal-hero h1 em { color: var(--lavanda); font-style: normal; }
        .portal-hero p { font-size: clamp(14px, 2vw, 17px); color: var(--lavanda); line-height: 1.6; max-width: 480px; margin-bottom: 28px; }
        .portal-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .portal-hero-phone { display: flex; justify-content: center; align-items: flex-start; }
        @media (max-width: 900px) {
          .portal-hero-phone { transform: scale(0.82); transform-origin: top center; margin-bottom: -60px; }
        }
        @media (max-width: 600px) {
          .portal-hero-phone { transform: scale(0.68); transform-origin: top center; margin-bottom: -110px; }
        }

        /* 3 COLS */
        .portal-3col {
          padding: clamp(40px, 7vw, 64px) clamp(16px, 4vw, 48px);
          background: var(--lav-l);
        }
        .portal-3col h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 34px);
          color: var(--noche); text-align: center; margin-bottom: 8px;
        }
        .portal-3col .sub { text-align: center; color: var(--muted); font-size: 15px; margin-bottom: 36px; }
        .portal-col-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .portal-col-card {
          background: white; border-radius: 20px; padding: clamp(20px, 3vw, 28px) 24px;
          border: .5px solid var(--lavanda); transition: box-shadow .2s, transform .2s;
        }
        .portal-col-card:hover { box-shadow: 0 8px 32px rgba(74,63,140,.12); transform: translateY(-2px); }
        .portal-col-card .card-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .portal-col-card h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--noche); margin-bottom: 8px; }
        .portal-col-card p  { font-size: 14px; color: var(--muted); line-height: 1.6; }
        .portal-card-link {
          font-size: 13px; font-weight: 600; margin-top: 20px; display: inline-flex;
          align-items: center; gap: 6px;
          text-decoration: none; cursor: pointer;
          border-radius: 40px; padding: 10px 20px;
          border: 1.5px solid currentColor;
          transition: background .2s, color .2s, transform .15s, box-shadow .2s;
        }
        .portal-card-link:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(74,63,140,.18);
        }
        .portal-card-link-fill {
          background: var(--violeta); color: #F4F2FF !important;
          border-color: var(--violeta) !important;
        }
        .portal-card-link-fill:hover { background: var(--purpura); border-color: var(--purpura) !important; box-shadow: 0 4px 20px rgba(123,111,204,.35); }

        /* CHAT DEMO */
        .portal-chat-demo {
          padding: clamp(40px, 7vw, 64px) clamp(16px, 4vw, 48px);
          background: var(--blanco);
          display: flex; align-items: center; gap: clamp(24px, 5vw, 60px); flex-wrap: wrap;
        }
        .portal-chat-demo-text { flex: 1; min-width: 260px; }
        .portal-chat-demo-text h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 34px);
          color: var(--noche); margin-bottom: 12px; line-height: 1.2;
        }
        .portal-chat-demo-text p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 24px; }
        .portal-feature-list { display: flex; flex-direction: column; gap: 12px; }
        .portal-feature-item { display: flex; align-items: flex-start; gap: 12px; }
        .portal-feat-dot { width: 8px; height: 8px; background: var(--purpura); border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
        .portal-feat-text { font-size: 14px; color: var(--texto); line-height: 1.5; }

        /* APP DOWNLOAD SECTION */
        .portal-download {
          background: var(--noche);
          padding: clamp(40px, 6vw, 60px) clamp(16px, 4vw, 48px);
          text-align: center;
        }
        .portal-download h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(22px, 4vw, 32px);
          color: var(--blanco); margin-bottom: 10px;
        }
        .portal-download p { font-size: 15px; color: var(--lavanda); margin-bottom: 28px; }
        .portal-store-badges { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* FOOTER */
        .portal-footer { background: var(--noche); padding: clamp(32px, 5vw, 56px) clamp(16px, 4vw, 48px) 24px; border-top: 1px solid rgba(255,255,255,.08); }
        .portal-footer-top { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 32px; margin-bottom: 36px; }
        .portal-footer-brand .footer-name { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--blanco); margin-bottom: 10px; }
        .portal-footer-brand .footer-desc { font-size: 13px; color: var(--lavanda); line-height: 1.6; max-width: 260px; }
        .portal-footer-col h4 { color: var(--blanco); font-size: 13px; font-weight: 600; margin-bottom: 12px; letter-spacing: .5px; }
        .portal-footer-col a { display: block; color: var(--lavanda); font-size: 13px; text-decoration: none; margin-bottom: 8px; transition: color .2s; }
        .portal-footer-col a:hover { color: var(--blanco); }
        .portal-footer-bot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid rgba(255,255,255,.08); padding-top: 20px; }
        .portal-footer-bot p { font-size: 12px; color: rgba(184,174,237,.5); }
        .portal-anon-pill { background: rgba(123,111,204,.25); color: var(--lavanda); font-size: 11px; padding: 4px 14px; border-radius: 20px; border: 1px solid rgba(123,111,204,.4); }

        /* Shared buttons */
        .btn-primary-pill { background: var(--purpura); color: var(--blanco); border: none; border-radius: 40px; padding: 14px 32px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; }
        .btn-primary-pill:hover { opacity: .85; }
        .btn-outline-pill { background: transparent; color: var(--lavanda); border: 1.5px solid var(--lavanda); border-radius: 40px; padding: 14px 32px; font-size: 15px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; }
        .btn-outline-pill:hover { opacity: .7; }
        .btn-anon { background: var(--purpura); color: var(--blanco); border: none; border-radius: 40px; padding: 8px 20px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; }
        .btn-anon:hover { opacity: .85; }

        @media (max-width: 768px) {
          .portal-nav-links { display: none !important; }
          .portal-hamburger { display: flex !important; }
          .portal-hero-phone { width: 100%; }
          .portal-chat-demo { flex-direction: column; }
          .portal-chat-demo > div:last-child { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      <div className="portal-root">

        {/* ── NAVBAR ── */}
        <nav className="portal-nav">
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img
              src="/icono.png"
              alt="Susurra"
              style={{ width: 64, height: 64, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(123,111,204,0.6))' }}
            />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--blanco)' }}>Susurra</span>
          </Link>

          {/* Desktop links */}
          <div className="portal-nav-links">
            <Link to="/chat">Pedir ayuda</Link>
            <Link to="/aprender">Aprender</Link>
            <Link to="/contactar">Contactar</Link>
            <Link to="/chat"><button className="btn-anon">Empezar — es anónimo</button></Link>
          </div>

          {/* Hamburger */}
          <button
            className="portal-hamburger"
            style={{ background: 'none', border: 'none', padding: 4 }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`portal-mob-menu${menuOpen ? ' open' : ''}`}>
          <Link to="/chat" onClick={() => setMenuOpen(false)}>Pedir ayuda</Link>
          <Link to="/aprender" onClick={() => setMenuOpen(false)}>Aprender</Link>
          <Link to="/contactar" onClick={() => setMenuOpen(false)}>Contactar</Link>
          <Link to="/historial" onClick={() => setMenuOpen(false)}>Historial</Link>
          <Link to="/chat" onClick={() => setMenuOpen(false)}><button className="btn-anon" style={{ width: '100%', marginTop: 4 }}>Empezar — es anónimo</button></Link>
        </div>

        {/* ── HERO ── */}
        <section className="portal-hero">
          <div className="portal-hero-text">
            <h1>Susurra lo que<br /><em>sientes.</em></h1>
            <p>Un espacio anónimo, seguro y sin juicio donde jóvenes bolivianos pueden pedir ayuda, aprender sobre sus derechos y conectar con servicios de apoyo real.</p>
            <div className="portal-hero-btns">
              <Link to="/chat"><button className="btn-primary-pill">Pedir ayuda ahora</button></Link>
              <Link to="/aprender"><button className="btn-outline-pill">Aprender mis derechos</button></Link>
            </div>
            <div style={{ marginTop: 20, fontSize: 12, color: 'var(--purpura)' }}>Sin registro · Sin historial guardado · 100% anónimo</div>
          </div>
          <div className="portal-hero-phone">
            <MiniPhone />
          </div>
        </section>

        {/* ── 3 MODULES ── */}
        <section className="portal-3col">
          <h2>Tres formas de ayudarte</h2>
          <p className="sub">Elige desde donde te sientes más cómodo/a</p>
          <div className="portal-col-grid">

            <div className="portal-col-card">
              <div className="card-icon" style={{ background: 'var(--lav-l)' }}><IconChat /></div>
              <h3>Pedir ayuda</h3>
              <p>Nuestro chat con IA te escucha, identifica tu situación y te da pasos concretos. Si lo necesitas, te conecta con una persona real.</p>
              <Link to="/chat" className="portal-card-link" style={{ color: '#993556', borderColor: 'var(--azul)' }}>
                Comenzar <span style={{ fontSize: 15 }}>→</span>
              </Link>
            </div>

            <div className="portal-col-card">
              <div className="card-icon" style={{ background: 'var(--azul-ll)' }}><IconLearn /></div>
              <h3>Aprender</h3>
              <p>Información clara sobre anticoncepción, ITS, consentimiento y tus derechos bajo la ley boliviana. Con un minijuego para evaluar lo aprendido.</p>
              <Link to="/aprender" className="portal-card-link" style={{ color: '#185FA5', borderColor: 'var(--azul)' }}>
                Explorar <span style={{ fontSize: 15 }}>→</span>
              </Link>
            </div>

            <div className="portal-col-card">
              <div className="card-icon" style={{ background: 'var(--rosa-l)' }}><IconContact /></div>
              <h3>Contactar</h3>
              <p>Directorio de servicios reales en La Paz y El Alto: salud, psicología, legal. Con plantilla de denuncia prellenada lista para la FELCV.</p>
              <Link to="/contactar" className="portal-card-link" style={{ color: '#993556', borderColor: 'var(--rosa)' }}>
                Ver servicios <span style={{ fontSize: 15 }}>→</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ── CHAT DEMO ── */}
        <section className="portal-chat-demo">
          <div className="portal-chat-demo-text">
            <h2>Un chat que te<br />acompaña de verdad</h2>
            <p>No es un bot genérico. Susurra fue diseñada para entender situaciones de violencia digital y DSDR en el contexto boliviano.</p>
            <div className="portal-feature-list">
              {[
                'Identifica grooming, sextorsión, acoso y otras situaciones',
                'Te da pasos concretos adaptados a tu situación',
                'Genera tu guía de denuncia en PDF lista para presentar',
                'Puede conectarte con la FELCV o un psicólogo real',
              ].map(feat => (
                <div key={feat} className="portal-feature-item">
                  <div className="portal-feat-dot" />
                  <div className="portal-feat-text">{feat}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link to="/chat"><button className="btn-primary-pill">Hablar con Susurra</button></Link>
            </div>
          </div>
          <ChatDemoWindow />
        </section>

        {/* ── APP DOWNLOAD ── */}
        <section className="portal-download">
          <h2>Lleva Susurra contigo</h2>
          <p>Disponible en tu teléfono. Gratuita, anónima y siempre disponible.</p>
          <div className="portal-store-badges">
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(184,174,237,.5)' }}>
            Próximamente disponible en tiendas
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="portal-footer">
          <div className="portal-footer-top">
            <div className="portal-footer-brand">
              <div className="footer-name">Susurra</div>
              <div className="footer-desc">Un espacio anónimo de acompañamiento en derechos sexuales, reproductivos y seguridad digital para jóvenes bolivianos.</div>
            </div>
            <div className="portal-footer-col">
              <h4>La plataforma</h4>
              <Link to="/chat">Pedir ayuda</Link>
              <Link to="/aprender">Aprender</Link>
              <Link to="/aprender/juego">¿Mito o Verdad?</Link>
              <Link to="/contactar">Contactar</Link>
              <Link to="/historial">Historial</Link>
            </div>
            <div className="portal-footer-col">
              <h4>Información</h4>
              <a href="#">¿Cómo funciona?</a>
              <a href="#">Política de privacidad</a>
              <a href="#">Alianzas institucionales</a>
            </div>
            <div className="portal-footer-col">
              <h4>Recursos</h4>
              <a href="#">FELCV — 800-10-0822</a>
              <a href="#">S.O.S. Digital</a>
              <a href="#">Ipas Bolivia</a>
            </div>
          </div>
          <div className="portal-footer-bot">
            <p>© 2025 Susurra · Code Cats Studio · Hackathon Ipas Bolivia</p>
            <div className="portal-anon-pill">100% anónimo</div>
          </div>
        </footer>

      </div>
    </>
  )
}
