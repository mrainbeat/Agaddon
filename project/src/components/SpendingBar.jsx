import { formatWon } from '../lib/store.js'

// 소비 내역 게이지: 이번 달 예산 대비 지출 현황
function SpendingBar({ spentAmount, maxAmount }) {
  const ratio = maxAmount > 0 ? Math.min(spentAmount / maxAmount, 1) : 0
  const percent = Math.round(ratio * 100)
  const isOver = spentAmount > maxAmount
  const isNearLimit = !isOver && ratio >= 0.85

  return (
    <section className="flex flex-col gap-2.5" aria-label="소비 내역">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-bold">소비 내역</h2>
        <span className={`text-[13px] font-bold ${isOver ? 'text-danger' : 'text-ink-muted'}`}>{percent}%</span>
      </div>

      <div
        className="h-2.5 overflow-hidden rounded-full bg-line-soft"
        role="progressbar"
        aria-valuenow={spentAmount}
        aria-valuemin={0}
        aria-valuemax={maxAmount}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-400 ease-in-out ${
            isOver ? 'bg-danger' : isNearLimit ? 'bg-warn' : 'bg-ink'
          }`}
          style={{ width: `${Math.max(percent, 4)}%` }}
        />
      </div>

      <div className="flex justify-between text-[13px] font-semibold">
        <span>{formatWon(spentAmount)}</span>
        <span className="font-medium text-ink-muted">최대 {formatWon(maxAmount)}</span>
      </div>
    </section>
  )
}

export default SpendingBar
