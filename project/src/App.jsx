import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Home from "./pages/Home.jsx";
import Friends from "./pages/Friends.jsx";
import Records from "./pages/Records.jsx";
import MyPage from "./pages/MyPage.jsx";
import Notifications from "./pages/Notifications.jsx";
import PlanSetup from "./pages/PlanSetup.jsx";
import SpendEntry from "./pages/SpendEntry.jsx";
import BottomNav from "./components/BottomNav.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";

function Layout() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[430px] flex-col bg-surface
        h-dvh
        sm:my-6 sm:h-[900px] sm:overflow-hidden sm:rounded-[32px] sm:shadow-[0_20px_60px_rgba(20,18,40,0.16)]"
    >
      {/* 콘텐츠 영역: 내용이 길어지면 여기서만 스크롤 */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>

      {/* 하단 네비게이션: 스크롤에 밀리지 않고 화면 맨 아래에 고정 */}
      <div className="shrink-0">
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* 스플래시(온보딩) 화면 - 처음 앱 진입 시 노출 */}
      <Route path="/" element={<OnboardingPage />} />

      {/* 로그인 화면 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Login" element={<Navigate to="/login" replace />} />

      {/* 카카오 로그인 후 백엔드가 리다이렉트하는 콜백 페이지 */}
      <Route path="/oauth/callback" element={<OAuthCallback />} />

      {/* 하단 네비바가 있는 메인 화면들 */}
      <Route element={<Layout />}>
        {/* 주의: OnboardingPage가 '/'를 사용하므로 Home은 '/home'으로 변경했습니다 */}
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/records" element={<Records />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plan" element={<PlanSetup />} />
        <Route path="/spend" element={<SpendEntry />} />
      </Route>
    </Routes>
  );
}

export default App;
