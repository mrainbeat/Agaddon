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
    <button type="button" className="-ml-1 flex p-1 text-ink" onClick={onClick} aria-label="뒤로 가기">
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
    <div className="flex flex-col gap-6 px-5 pb-2 pt-5">
      <header className="flex items-center gap-2">
        <BackButton onClick={() => navigate('/')} />
        <h1 className="text-lg font-bold">알림</h1>
      </header>

      {(isOver || isNearLimit) && (
        <div className={`rounded-2xl px-4 py-3.5 ${isOver ? 'bg-danger-soft' : 'bg-warn-soft'}`}>
          <p className={`mb-1 text-sm font-bold ${isOver ? 'text-danger' : 'text-[#b3670c]'}`}>
            {isOver ? '이번 달 예산을 넘었어요' : '예산이 얼마 안 남았어요'}
          </p>
          <p className="text-[13px] leading-relaxed text-ink-muted">
            {isOver
              ? `최대 ${formatWon(maxAmount)} 중 ${formatWon(spentAmount)}을 써서 ${formatWon(spentAmount - maxAmount)} 초과했어요.`
              : `최대 ${formatWon(maxAmount)} 중 ${formatWon(spentAmount)}(${Math.round(ratio * 100)}%)를 썼어요. 월급까지 D-${dDay} 남았어요.`}
          </p>
        </div>
      )}

      <section>
        <h2 className="mb-2.5 text-[15px] font-bold">다가오는 정기결제</h2>

        {upcoming.length === 0 && <p className="text-[13px] text-ink-muted">예정된 정기결제가 없어요.</p>}

        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {upcoming.map((sub) => (
            <li
              key={sub.id}
              className="flex items-center justify-between rounded-2xl border-[1.5px] border-line-soft px-3.5 py-3"
            >
              <div>
                <p className="text-sm font-bold">{sub.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{formatDateKo(sub.nextDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold">{formatWon(sub.amount)}</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    sub.daysLeft <= 3 ? 'bg-danger-soft text-danger' : 'bg-line-soft text-ink-muted'
                  }`}
                >
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
