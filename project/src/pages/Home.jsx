import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import ForecastCard from '../components/ForecastCard.jsx'
import SpendingBar from '../components/SpendingBar.jsx'
import { loadData, rollPaydayIfPassed, getDDay, getNextSubscription } from '../lib/store.js'

function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const initial = rollPaydayIfPassed(loadData())
    setData(initial)
  }, [])

  if (!data) return null

  const dDay = getDDay(data.budget.nextPayday)
  const nextSubRaw = getNextSubscription(data.subscriptions)
  const nextSub = nextSubRaw
    ? { ...nextSubRaw, daysLeft: getDDay(nextSubRaw.nextDate) }
    : null

  return (
    <div className="screen">
      <section className="forecast-card">
        <TopBar
          streakDays={data.profile.streakDays}
          streakMax={data.profile.streakMax}
          onBellClick={() => window.alert('알림 화면은 아직 준비 중이야!')}
        />
        <ForecastCard dDay={dDay} nextSub={nextSub} />
      </section>

      <SpendingBar spentAmount={data.budget.spentAmount} maxAmount={data.budget.maxAmount} />
    </div>
  )
}

export default Home
