import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Friends from './pages/Friends.jsx'
import Records from './pages/Records.jsx'
import MyPage from './pages/MyPage.jsx'
import Notifications from './pages/Notifications.jsx'
import PlanSetup from './pages/PlanSetup.jsx'
import SpendEntry from './pages/SpendEntry.jsx'
import BottomNav from './components/BottomNav.jsx'

function Layout() {
  return (
    <div
      className="relative flex w-full max-w-[430px] flex-col bg-surface
        min-h-svh
        sm:my-6 sm:h-[900px] sm:min-h-0 sm:overflow-hidden sm:rounded-[32px] sm:shadow-[0_20px_60px_rgba(20,18,40,0.16)]"
    >
      <main className="flex flex-1 flex-col overflow-y-auto pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/records" element={<Records />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plan" element={<PlanSetup />} />
        <Route path="/spend" element={<SpendEntry />} />
      </Route>
    </Routes>
  )
}

export default App
