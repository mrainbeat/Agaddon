import { formatWon } from '../lib/store.js'

function ForecastHeading({ dailyAvailable, onClick }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[13px] font-medium text-ink-muted">오늘의 소비가능금액</p>
      <button
        type="button"
        className="mt-0.5 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-ink"
        onClick={onClick}
      >
        <h1 className="text-[28px] font-bold tracking-tight">{formatWon(Math.max(dailyAvailable, 0))}</h1>
      </button>
    </div>
  )
}

export default ForecastHeading
