import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
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
    <div className="screen">
      <section className="forecast-card">
        <TopBar
          streakDays={data.profile.streakDays}
          streakMax={data.profile.streakMax}
          hasAlert={hasAlert}
          onBellClick={() => navigate('/notifications')}
        />
        <ForecastCard dDay={dDay} nextSub={nextSub} onHeadingClick={() => navigate('/notifications')} />
      </section>

      <SpendingBar spentAmount={spentAmount} maxAmount={maxAmount} />
    </div>
  )
}

export default Home
