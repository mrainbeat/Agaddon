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
    <div className="flex flex-1 flex-col px-5 pb-20 pt-5 justify-between h-full relative">
      {/* 상단 영역 (TopBar 및 헤딩) */}
      <div className="flex flex-col">
        <TopBar
          onBellClick={() => navigate("/notifications")}
          hasAlert={hasAlert}
        />
        <div className="mt-1">
          <ForecastHeading
            dailyAvailable={dailyAvailable}
            onClick={() => navigate("/notifications")}
          />
        </div>
      </div>

      {/* 중앙 ~ 살짝 아래에 고정될 캐릭터 영역 */}
      <div className="flex flex-col items-center justify-center -mt-10">
        <div className="flex justify-center scale-110">
          <ForecastCard
            nextSub={nextSub}
            budget={{ spentAmount, maxAmount, daysLeft: dDay }}
          />
        </div>
      </div>

      {/* 네비바 바로 위에 딱 붙어서 독립적으로 위치할 소비 내역 바 영역 */}
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
