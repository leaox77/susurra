import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import AppShell from '@/components/layout/AppShell'
import Home     from '@/pages/Home'
import Chat     from '@/pages/Chat'
import Learn    from '@/pages/Learn'
import Game     from '@/pages/Game'
import Contact  from '@/pages/Contact'
import History  from '@/pages/History'

export default function App() {
  useAuth()   // garantiza sesión anónima desde el arranque

  return (
    <AppShell>
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/chat"              element={<Chat />} />
        <Route path="/aprender"          element={<Learn />} />
        <Route path="/aprender/juego"    element={<Game />} />
        <Route path="/contactar"         element={<Contact />} />
        <Route path="/historial"         element={<History />} />
      </Routes>
    </AppShell>
  )
}
