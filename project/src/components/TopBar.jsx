// 상단바: 출석 스트릭(별) + 알림 벨
function TopBar({ streakDays, streakMax, onBellClick }) {
  const stars = Array.from({ length: streakMax }, (_, i) => i < streakDays)

  return (
    <header className="top-bar">
      <ul className="streak" aria-label={`연속 기록 ${streakDays}/${streakMax}일`}>
        {stars.map((filled, i) => (
          <li key={i} className={filled ? 'star filled' : 'star'} aria-hidden="true">
            ★
          </li>
        ))}
      </ul>
      <button type="button" className="bell" onClick={onBellClick} aria-label="알림">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3a6 6 0 0 0-6 6c0 4.2-1.2 5.9-2 7h16c-.8-1.1-2-2.8-2-7a6 6 0 0 0-6-6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}

export default TopBar
