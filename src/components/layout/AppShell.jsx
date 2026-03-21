import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/',          label: 'Inicio',    icon: HomeIcon },
  { path: '/aprender',  label: 'Aprender',  icon: BookIcon },
  { path: '/contactar', label: 'Contactar', icon: PhoneIcon },
  { path: '/historial', label: 'Historial', icon: ClockIcon },
]

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const inChat = pathname.startsWith('/chat')

  return (
    <div className="flex flex-col min-h-dvh bg-susurra">
      {/* Header */}
      {!inChat && <Header />}

      {/* Content */}
      <main className={`flex-1 overflow-y-auto ${!inChat ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* Bottom nav — oculto en chat */}
      {!inChat && (
        <nav className="fixed bottom-0 left-0 right-0 bg-noche safe-bottom z-50">
          <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = pathname === path
              return (
                <Link key={path} to={path} className="flex flex-col items-center gap-0.5 flex-1 py-2">
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
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}

function Header() {
  return (
    <header className="bg-noche px-4 py-3 flex items-center gap-3 sticky top-0 z-40 safe-top">
      <LogoMark />
      <div className="flex-1">
        <h1 className="font-serif text-base text-blanco leading-none">Susurra</h1>
        <p className="text-[10px] text-lavanda">tu espacio seguro</p>
      </div>
      <span className="text-[10px] bg-purpura text-lav-l px-2.5 py-1 rounded-full font-medium">
        anónimo
      </span>
    </header>
  )
}

function LogoMark() {
  return (
    <div className="w-7 h-7 bg-purpura rounded-full flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
        <circle cx="5" cy="5" r="3" stroke="#F4F2FF" strokeWidth="1.2"/>
        <circle cx="13" cy="6" r="2.5" stroke="#B8AEED" strokeWidth="1.2"/>
        <path d="M9 10Q7 13 7 17" stroke="#F4F2FF" strokeWidth="1" strokeLinecap="round"/>
        <path d="M9 10Q11 13 11 17" stroke="#B8AEED" strokeWidth="1" strokeLinecap="round"/>
        <path d="M8.5 9Q9.5 8 10.5 9" stroke="#E8D8FF" strokeWidth=".8" strokeLinecap="round"/>
      </svg>
    </div>
  )
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
