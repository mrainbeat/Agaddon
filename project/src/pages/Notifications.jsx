import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loadData,
  rollPaydayIfPassed,
  getDDay,
  getUpcomingSubscriptions,
  formatWon,
  formatDateKo,
} from '../lib/store.js'

function BackButton({ onClick }) {
  return (
    <button type="button" className="back-btn" onClick={onClick} aria-label="뒤로 가기">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

function Notifications() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(rollPaydayIfPassed(loadData()))
  }, [])

  if (!data) return null

  const dDay = getDDay(data.budget.nextPayday)
  const { spentAmount, maxAmount } = data.budget
  const ratio = maxAmount > 0 ? spentAmount / maxAmount : 0
  const isOver = spentAmount > maxAmount
  const isNearLimit = !isOver && ratio >= 0.85

  const upcoming = getUpcomingSubscriptions(data.subscriptions).map((sub) => ({
    ...sub,
    daysLeft: getDDay(sub.nextDate),
  }))

  return (
    <div className="screen notifications-screen">
      <header className="page-head">
        <BackButton onClick={() => navigate('/')} />
        <h1>알림</h1>
      </header>

      {(isOver || isNearLimit) && (
        <div className={`alert-card${isOver ? ' danger' : ' warn'}`}>
          <p className="alert-title">{isOver ? '이번 달 예산을 넘었어요' : '예산이 얼마 안 남았어요'}</p>
          <p className="alert-desc">
            {isOver
              ? `최대 ${formatWon(maxAmount)} 중 ${formatWon(spentAmount)}을 써서 ${formatWon(spentAmount - maxAmount)} 초과했어요.`
              : `최대 ${formatWon(maxAmount)} 중 ${formatWon(spentAmount)}(${Math.round(ratio * 100)}%)를 썼어요. 월급까지 D-${dDay} 남았어요.`}
          </p>
        </div>
      )}

      <section className="notif-section">
        <h2>다가오는 정기결제</h2>

        {upcoming.length === 0 && <p className="notif-empty">예정된 정기결제가 없어요.</p>}

        <ul className="notif-list">
          {upcoming.map((sub) => (
            <li key={sub.id} className="notif-item">
              <div className="notif-item-main">
                <p className="notif-item-name">{sub.name}</p>
                <p className="notif-item-date">{formatDateKo(sub.nextDate)}</p>
              </div>
              <div className="notif-item-side">
                <p className="notif-item-amount">{formatWon(sub.amount)}</p>
                <span className={`notif-badge${sub.daysLeft <= 3 ? ' soon' : ''}`}>
                  {sub.daysLeft === 0 ? '오늘' : `D-${sub.daysLeft}`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Notifications
