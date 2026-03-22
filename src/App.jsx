import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import AppShell from '@/components/layout/AppShell'
import Splash   from '@/pages/Splash'
import Home     from '@/pages/Home'
import Chat     from '@/pages/Chat'
import Learn    from '@/pages/Learn'
import Game     from '@/pages/Game'
import Contact  from '@/pages/Contact'
import History  from '@/pages/History'
import Portal  from '@/pages/Portal'

const SPLASH_KEY = 'susurra-splash-seen'

export default function App() {
  const { authReady } = useAuth()
  const [showSplash, setShowSplash] = useState(
    () => !localStorage.getItem(SPLASH_KEY)
  )

  const handleSplashDone = () => {
    localStorage.setItem(SPLASH_KEY, '1')
    setShowSplash(false)
  }

  // Pantalla de carga mientras se crea la sesión anónima
  if (!authReady) return (
    <div className="fixed inset-0 bg-noche flex items-center justify-center">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 bg-purpura rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )

  return (
    <>
      {showSplash && <Splash onDone={handleSplashDone} />}
      <AppShell>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/chat"           element={<Chat />} />
          <Route path="/aprender"       element={<Learn />} />
          <Route path="/aprender/juego" element={<Game />} />
          <Route path="/contactar"      element={<Contact />} />
          <Route path="/historial"      element={<History />} />
          <Route path="/portal"         element={<Portal />} />
        </Routes>
      </AppShell>
    </>
  )
}