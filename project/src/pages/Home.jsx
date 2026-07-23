import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import ForecastHeading from '../components/ForecastHeading.jsx'
import ForecastCard from '../components/ForecastCard.jsx'
import SpendingBar from '../components/SpendingBar.jsx'
import { loadData, rollPaydayIfPassed, touchStreak, getDDay, getNextSubscription, getDailyAvailable } from '../lib/store.js'

function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const loaded = await loadData()
      const withPayday = await rollPaydayIfPassed(loaded)
      const withStreak = await touchStreak(withPayday)
      if (!cancelled) setData(withStreak)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (!data) return null

  const dDay = getDDay(data.budget.nextPayday)
  const nextSubRaw = getNextSubscription(data.subscriptions)
  const nextSub = nextSubRaw
    ? { ...nextSubRaw, daysLeft: getDDay(nextSubRaw.nextDate) }
    : null

  const { spentAmount, maxAmount } = data.budget
  const dailyAvailable = getDailyAvailable(data.budget)
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
      <ForecastHeading dailyAvailable={dailyAvailable} onClick={() => navigate('/notifications')} />
      <ForecastCard nextSub={nextSub} budget={{ spentAmount, maxAmount, daysLeft: dDay }} />
      <SpendingBar spentAmount={spentAmount} maxAmount={maxAmount} onAddClick={() => navigate('/spend')} />
    </div>
  )
}

export default Home
