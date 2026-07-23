import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Friends from './pages/Friends.jsx'
import Records from './pages/Records.jsx'
import MyPage from './pages/MyPage.jsx'
import Notifications from './pages/Notifications.jsx'
import PlanSetup from './pages/PlanSetup.jsx'
import BottomNav from './components/BottomNav.jsx'
import './App.css'

function Layout() {
  return (
    <div className="app-frame">
      <main className="app-main">
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
      </Route>
    </Routes>
  )
}

export default App
