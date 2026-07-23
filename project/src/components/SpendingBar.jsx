import { formatWon } from '../lib/store.js'

// 소비 내역 게이지: 이번 달 예산 대비 지출 현황
function SpendingBar({ spentAmount, maxAmount }) {
  const ratio = maxAmount > 0 ? Math.min(spentAmount / maxAmount, 1) : 0
  const percent = Math.round(ratio * 100)
  const isOver = spentAmount > maxAmount
  const isNearLimit = !isOver && ratio >= 0.85

  return (
    <section className="spending-section" aria-label="소비 내역">
      <div className="spending-section-head">
        <h2>소비 내역</h2>
        <span className={`spending-percent${isOver ? ' over' : ''}`}>{percent}%</span>
      </div>

      <div
        className="spending-track"
        role="progressbar"
        aria-valuenow={spentAmount}
        aria-valuemin={0}
        aria-valuemax={maxAmount}
      >
        <div
          className={`spending-fill${isOver ? ' over' : isNearLimit ? ' warn' : ''}`}
          style={{ width: `${Math.max(percent, 4)}%` }}
        />
      </div>

      <div className="spending-labels">
        <span>{formatWon(spentAmount)}</span>
        <span className="muted">최대 {formatWon(maxAmount)}</span>
      </div>
    </section>
  )
}

export default SpendingBar
