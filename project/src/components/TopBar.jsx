// 상단바: 출석 스트릭(별) + 알림 벨
function TopBar({ streakDays, streakMax, onBellClick, hasAlert = false }) {
  const stars = Array.from({ length: streakMax }, (_, i) => i < streakDays)

  return (
    <header className="flex items-center justify-between">
      <ul className="m-0 flex list-none gap-[3px] p-0" aria-label={`연속 기록 ${streakDays}/${streakMax}일`}>
        {stars.map((filled, i) => (
          <li key={i} className={`text-sm ${filled ? 'text-star' : 'text-line-soft'}`} aria-hidden="true">
            ★
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="relative flex p-1 text-ink"
        onClick={onBellClick}
        aria-label={hasAlert ? '알림 (새 소식 있음)' : '알림'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3a6 6 0 0 0-6 6c0 4.2-1.2 5.9-2 7h16c-.8-1.1-2-2.8-2-7a6 6 0 0 0-6-6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {hasAlert && (
          <span
            className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full border-[1.5px] border-surface bg-danger"
            aria-hidden="true"
          />
        )}
      </button>
    </header>
  )
}

export default TopBar
