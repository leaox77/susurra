/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/',          label: 'Inicio',    id: 'nav-inicio',    icon: HomeIcon  },
  { path: '/aprender',  label: 'Aprender',  id: 'nav-aprender',  icon: BookIcon  },
  { path: '/contactar', label: 'Contactar', id: 'nav-contactar', icon: PhoneIcon },
  { path: '/historial', label: 'Historial', id: 'nav-historial', icon: ClockIcon },
]

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const inChat = pathname.startsWith('/chat')
  const inPortal = pathname.startsWith('/portal')

  return (
    <div className="flex flex-col min-h-dvh bg-susurra">
      {/* Header — oculto en chat y en portal */}
      {!inChat && !inPortal && <Header pathname={pathname} />}

      {/* Content */}
      <main className={`flex-1 overflow-y-auto ${inChat ? '' : 'pb-20 md:pb-12'}`}>
                {children}
      </main>

      {/* Footer solo escritorio */}
      {!inChat && !inPortal && <Footer pathname={pathname} />}

      {/* Bottom nav — oculto en chat y en portal */}
      {!inChat && !inPortal && (
        <nav className="fixed bottom-0 left-0 right-0 bg-noche safe-bottom z-50 md:hidden">
          <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
            {navItems.map(({ path, label, id, icon: Icon }) => {
              const active = pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  id={`tut-${id}`}
                  className="flex flex-col items-center gap-0.5 flex-1 py-2"
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-lavanda' : 'text-purpura/50'}`} />
                    {active && (
                      <motion.div
                        layoutId="nav-dot"
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-purpura rounded-full"
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium transition-colors ${active ? 'text-lavanda' : 'text-purpura/50'}`}>
                    {label}
                  </span>
                </Link>
              )}
            )}
          </div>
        </nav>
      )}
    </div>
  )
}

function Header({ pathname }) {
  return (
    <header className="sticky top-0 z-40 safe-top bg-noche/90 backdrop-blur border-b border-purpura/10">
      <div className="hidden md:flex max-w-6xl w-full mx-auto px-6 lg:px-10 py-3 items-center gap-6">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div className="hidden md:block leading-tight">
            <h1 className="font-serif text-xl text-blanco">Susurra</h1>
            <p className="text-[11px] text-lav-l">Tu espacio seguro, ahora también en desktop</p>
          </div>
        </div>

        {/* Navegación escritorio */}
        <nav className="flex-1 hidden md:flex items-center justify-center gap-3">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold leading-none transition-all border min-h-[42px] ${active ? 'border-lavanda bg-lav-l/30 text-blanco shadow-sm' : 'border-transparent text-lav-l hover:border-lavanda/40 hover:bg-lav-l/15 hover:text-blanco'}`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blanco' : 'text-lav-l'}`} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex text-xs bg-purpura text-lav-l px-4 py-1.5 rounded-full font-semibold uppercase tracking-wide border border-purpura/40 shadow-sm">
            Anonimato activo
          </span>
          <Link
            to="/chat"
            className="hidden md:inline-flex items-center gap-2 bg-lavanda text-noche text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-[1px]"
          >
            Hablar con Su
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Encabezado compacto para móvil (sin cambios) */}
      <div className="md:hidden px-4 py-3 flex items-center gap-3">
        <LogoMark />
        <div className="flex-1">
          <h1 className="font-serif text-base text-blanco leading-none">Susurra</h1>
          <p className="text-[10px] text-lavanda">tu espacio seguro</p>
        </div>
        <span className="text-[10px] bg-purpura text-lav-l px-2.5 py-1 rounded-full font-medium">
          anónimo
        </span>
      </div>
    </header>
  )
}

function Footer({ pathname }) {
  return (
    <footer className="hidden md:block bg-noche text-blanco border-t border-purpura/10 mt-6">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-wrap items-start gap-10">
        <div className="flex items-center gap-3 min-w-[200px]">
          <LogoMark />
          <div>
            <p className="font-serif text-lg leading-tight">Susurra</p>
            <p className="text-sm text-lav-l">Tu espacio seguro también en escritorio.</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 min-w-[260px]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-lav-l">Explorar</p>
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block text-sm transition-colors ${pathname === path ? 'text-lavanda font-semibold' : 'text-lav-l hover:text-blanco'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-lav-l">Acceso rápido</p>
            <Link to="/chat" className="block text-sm text-lav-l hover:text-blanco">Hablar con Su</Link>
            <Link to="/aprender" className="block text-sm text-lav-l hover:text-blanco">Aprender y cuidar</Link>
            <Link to="/historial" className="block text-sm text-lav-l hover:text-blanco">Revisar sesiones</Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-lav-l">Soporte</p>
            <a href="mailto:hola@susurra.app" className="block text-sm text-lav-l hover:text-blanco">hola@susurra.app</a>
            <span className="block text-sm text-lav-l">Disponible 24/7</span>
          </div>
        </div>

        <div className="min-w-[220px] space-y-3">
          <p className="text-sm text-lav-l leading-relaxed">
            Creamos este espacio para que te sientas escuchada y acompañada. Desde ahora, la experiencia en escritorio se siente tan cuidada como en tu móvil.
          </p>
          <Link
            to="/contactar"
            className="inline-flex items-center gap-2 bg-lavanda text-noche text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            Habla con nosotras
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-purpura/10 py-4 px-6 lg:px-10 text-xs text-lav-l flex items-center justify-between max-w-6xl mx-auto w-full">
        <span>Susurra · Tu espacio seguro</span>
        <span>Con cariño para desktop.</span>
      </div>
    </footer>
  )
}

function LogoMark() {
  return (
    <div className="w-7 h-7 flex-shrink-0">
      <img
        src="/icono.png"
        alt="Susurra"
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 1px 4px rgba(123,111,204,0.5))' }}
      />
    </div>
  )
}
function ArrowIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h10.5M10.5 5.5L15 10l-4.5 4.5"/></svg>
}

// ── Iconos SVG ──
function HomeIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10L10 3l7 7M5 8.5V17h4v-4h2v4h4V8.5"/></svg>
}
function BookIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h8a2 2 0 012 2v10a2 2 0 01-2 2H4V4z"/><path d="M12 4h2a2 2 0 012 2v10a2 2 0 01-2 2h-2"/><path d="M7 8h4M7 11h3"/></svg>
}
function PhoneIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h5l2 4-2.5 1.5a9 9 0 004 4L14 11l4 2v4a1 1 0 01-1 1A15 15 0 013 3a1 1 0 011-1"/></svg>
}
function ClockIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.5 2.5"/></svg>
}