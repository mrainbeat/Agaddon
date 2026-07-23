import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import ForecastHeading from "../components/ForecastHeading.jsx";
import ForecastCard from "../components/ForecastCard.jsx";
import SpendingBar from "../components/SpendingBar.jsx";
import { fetchHome, isLoggedIn } from "../lib/store.js";

function Home() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }

    let cancelled = false;
    async function load() {
      try {
        const data = await fetchHome();
        if (!cancelled) setHome(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
        <p className="text-sm text-ink-muted">{error}</p>
        <button
          type="button"
          className="rounded-xl bg-[#FF795B] px-5 py-2.5 text-sm font-bold text-white"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!home) return null;

  const {
    monthlyBudget,
    totalSpentThisMonth,
    dailySafeAmount,
    characterMessage,
    upcomingSubscription,
  } = home;

  const isBudgetTight =
    monthlyBudget > 0 && totalSpentThisMonth / monthlyBudget >= 0.85;
  const isPaymentSoon =
    upcomingSubscription != null && upcomingSubscription.dDayToBilling <= 3;
  const hasAlert = isBudgetTight || isPaymentSoon;

  return (
    <div className="flex flex-1 flex-col px-5 pb-24 pt-5 justify-between h-full w-full max-w-md mx-auto box-border overflow-x-hidden">
      {/* 상단 영역 */}
      <div className="flex flex-col w-full">
        <TopBar
          onBellClick={() => navigate("/notifications")}
          hasAlert={hasAlert}
        />
        <div className="mt-1 w-full">
          <ForecastHeading
            dailyAvailable={dailySafeAmount}
            onClick={() => navigate("/notifications")}
          />
        </div>
      </div>

      {/* 중앙 캐릭터 영역 */}
      <div className="flex flex-col items-center justify-center w-full my-auto py-4">
        <div className="flex justify-center w-full">
          <ForecastCard message={characterMessage} />
        </div>
      </div>

      {/* 하단 소비 내역 바 영역 */}
      <div className="w-full pb-2">
        <SpendingBar
          spentAmount={totalSpentThisMonth}
          maxAmount={monthlyBudget}
          onAddClick={() => navigate("/spend")}
        />
      </div>
    </div>
  );
}

export default Home;
