import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import ForecastHeading from '../components/ForecastHeading.jsx'
import ForecastCard from '../components/ForecastCard.jsx'
import SpendingBar from '../components/SpendingBar.jsx'
import { loadData, rollPaydayIfPassed, touchStreak, getDDay, getNextSubscription } from '../lib/store.js'

function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    // 접속할 때마다: 월급일 롤오버 -> 오늘 접속 스트릭 반영, 순서대로 적용
    const withPayday = rollPaydayIfPassed(loadData())
    const withStreak = touchStreak(withPayday)
    setData(withStreak)
  }, [])

  if (!data) return null

  const dDay = getDDay(data.budget.nextPayday)
  const nextSubRaw = getNextSubscription(data.subscriptions)
  const nextSub = nextSubRaw
    ? { ...nextSubRaw, daysLeft: getDDay(nextSubRaw.nextDate) }
    : null

  const { spentAmount, maxAmount } = data.budget
  const isBudgetTight = maxAmount > 0 && spentAmount / maxAmount >= 0.85
  const isPaymentSoon = nextSub != null && nextSub.daysLeft <= 3
  const hasAlert = isBudgetTight || isPaymentSoon

  return (
    <div className="flex flex-1 flex-col gap-5 px-5 pb-2 pt-5">
      <TopBar
        streakDays={data.profile.streakDays}
        streakMax={data.profile.streakMax}
        hasAlert={hasAlert}
        onBellClick={() => navigate('/notifications')}
      />
      <ForecastHeading dDay={dDay} onClick={() => navigate('/notifications')} />
      <ForecastCard nextSub={nextSub} budget={{ spentAmount, maxAmount, daysLeft: dDay }} />
      <SpendingBar spentAmount={spentAmount} maxAmount={maxAmount} onAddClick={() => navigate('/spend')} />
    </div>
  )
}

export default Home
