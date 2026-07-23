// "오늘의 소비예보" 라벨 + "월급까지 D-n" 헤더. 박스 없이 화면 상단에 그냥 얹힌다.
function ForecastHeading({ dDay, onClick }) {
  const dDayText = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${Math.abs(dDay)}`

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[13px] font-medium text-ink-muted">오늘의 소비예보</p>
      <button
        type="button"
        className="mt-0.5 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-ink"
        onClick={onClick}
      >
        <h1 className="text-2xl font-bold tracking-tight">월급까지 {dDayText}</h1>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default ForecastHeading
