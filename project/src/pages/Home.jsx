import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import ForecastHeading from "../components/ForecastHeading.jsx";
import ForecastCard from "../components/ForecastCard.jsx";
import SpendingBar from "../components/SpendingBar.jsx";
import {
  loadData,
  rollPaydayIfPassed,
  touchStreak,
  getDDay,
  getNextSubscription,
  getDailyAvailable,
} from "../lib/store.js";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const loaded = await loadData();
      const withPayday = await rollPaydayIfPassed(loaded);
      const withStreak = await touchStreak(withPayday);
      if (!cancelled) setData(withStreak);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  const dDay = getDDay(data.budget.nextPayday);
  const nextSubRaw = getNextSubscription(data.subscriptions);
  const nextSub = nextSubRaw
    ? { ...nextSubRaw, daysLeft: getDDay(nextSubRaw.nextDate) }
    : null;

  const { spentAmount, maxAmount } = data.budget;
  const dailyAvailable = getDailyAvailable(data.budget);
  const isBudgetTight = maxAmount > 0 && spentAmount / maxAmount >= 0.85;
  const isPaymentSoon = nextSub != null && nextSub.daysLeft <= 3;
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
            dailyAvailable={dailyAvailable}
            onClick={() => navigate("/notifications")}
          />
        </div>
      </div>

      {/* 중앙 캐릭터 영역 */}
      <div className="flex flex-col items-center justify-center w-full my-auto py-4">
        <div className="flex justify-center w-full">
          <ForecastCard
            nextSub={nextSub}
            budget={{ spentAmount, maxAmount, daysLeft: dDay }}
          />
        </div>
      </div>

      {/* 하단 소비 내역 바 영역 */}
      <div className="w-full pb-2">
        <SpendingBar
          spentAmount={spentAmount}
          maxAmount={maxAmount}
          onAddClick={() => navigate("/spend")}
        />
      </div>
    </div>
  );
}

export default Home;
