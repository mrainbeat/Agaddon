import Character from './Character.jsx'

function buildForecastMessage(nextSub) {
  if (!nextSub) return '다가오는 정기결제가 없어! 이번 달은 든든하네 🙌'

  const days = nextSub.daysLeft
  const amountText = nextSub.amount.toLocaleString('ko-KR')

  if (days <= 0) {
    return `오늘 ${nextSub.name} (${amountText}원) 결제일이야!`
  }
  return `${days}일 뒤에 ${nextSub.name} (${amountText}원) 결제가 있어!`
}

// 오늘의 소비예보 카드: "월급까지 D-n" 헤더 + 캐릭터 말풍선
function ForecastCard({ dDay, nextSub }) {
  const dDayText = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${Math.abs(dDay)}`

  return (
    <div className="forecast-body">
      <div className="forecast-heading">
        <p className="eyebrow">오늘의 소비예보</p>
        <button type="button" className="dday-row">
          <h1>월급까지 {dDayText}</h1>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="forecast-scene">
        <div className="speech-bubble">
          <p>{buildForecastMessage(nextSub)}</p>
        </div>
        <Character size={128} />
      </div>
    </div>
  )
}

export default ForecastCard
