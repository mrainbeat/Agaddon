import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import ForecastHeading from "../components/ForecastHeading.jsx";
import ForecastCard from "../components/ForecastCard.jsx";
import SpendingBar from "../components/SpendingBar.jsx";
import {
  fetchHome,
  isLoggedIn,
  loadData,
  getDailyAvailable,
  getNextSubscription,
  getDDay,
} from "../lib/store.js";

async function buildFallbackHome() {
  const local = await loadData();
  const nextSub = getNextSubscription(local.subscriptions);
  return {
    monthlyBudget: local.budget.maxAmount,
    totalSpentThisMonth: local.budget.spentAmount,
    dailySafeAmount: getDailyAvailable(local.budget),
    characterMessage: "아직 예산을 설정 안 했어요! 설정하면 더 정확하게 알려줄게요",
    upcomingSubscription: nextSub
      ? {
          name: nextSub.name,
          amount: nextSub.amount,
          dDayToBilling: getDDay(nextSub.nextDate),
        }
      : null,
    isFallback: true,
  };
}

function Home() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }

    let cancelled = false;
    async function load() {
      try {
        const data = await fetchHome();
        if (!cancelled) setHome({ ...data, isFallback: false });
      } catch (err) {
        // 백엔드에 아직 예산(플랜)이 설정 안 된 사용자는 로컬 기본값으로 홈을 보여준다.
        const fallback = await buildFallbackHome();
        if (!cancelled) setHome(fallback);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (!home) return null;

  const {
    monthlyBudget,
    totalSpentThisMonth,
    dailySafeAmount,
    characterMessage,
    upcomingSubscription,
    isFallback,
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
        {isFallback && (
          <button
            type="button"
            onClick={() => navigate("/plan")}
            className="mt-2 flex w-full items-center justify-between rounded-xl bg-accent-soft px-3 py-2 text-left text-[13px] font-semibold text-[#6B493D]"
          >
            <span>아직 예산을 설정 안 했어요</span>
            <span className="font-bold">설정하기 &gt;</span>
          </button>
        )}
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
