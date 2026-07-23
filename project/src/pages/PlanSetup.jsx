import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Character from '../components/Character.jsx'
import NumberPad from '../components/NumberPad.jsx'
import {
  loadData,
  saveBudgetPlan,
  addDays,
  toISODate,
  getDDay,
  formatWon,
  formatDateKo,
} from '../lib/store.js'

const MAX_AMOUNT_DIGITS = 10 // 최대 99억 9999만원까지

function BackButton({ onClick }) {
  return (
    <button type="button" className="back-btn" onClick={onClick} aria-label="뒤로 가기">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

function formatAmount(digits) {
  if (!digits) return '0'
  return Number(digits).toLocaleString('ko-KR')
}

// 플랜 세우기: 기간(월급날/다음주/직접입력) + 예산 총액을 정하고,
// 마지막에 캐릭터가 "하루에 얼마 쓰면 되는지" 계산해서 확인시켜준다.
// 저장하면 store의 budget.nextPayday / budget.maxAmount가 갱신되고,
// 홈 화면의 "월급까지 D-n"과 소비 게이지가 곧바로 이 값을 반영한다.
function PlanSetup() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [step, setStep] = useState('form') // 'form' | 'confirm'
  const [periodMode, setPeriodMode] = useState(null) // 'payday' | 'nextweek' | 'custom'
  const [customDate, setCustomDate] = useState('')
  const [amountDigits, setAmountDigits] = useState('')

  useEffect(() => {
    setData(loadData())
  }, [])

  if (!data) return null

  const periodEnd =
    periodMode === 'payday'
      ? data.budget.nextPayday
      : periodMode === 'nextweek'
        ? toISODate(addDays(new Date(), 7))
        : periodMode === 'custom'
          ? customDate
          : null

  const amount = Number(amountDigits || 0)
  const canProceed = Boolean(periodEnd) && amount > 0

  function handleDigit(digit) {
    setAmountDigits((prev) => (prev.length >= MAX_AMOUNT_DIGITS ? prev : prev + digit))
  }

  function handleBackspace() {
    setAmountDigits((prev) => prev.slice(0, -1))
  }

  function handleFinish() {
    saveBudgetPlan(data, { periodEnd, maxAmount: amount })
    navigate('/')
  }

  if (step === 'confirm') {
    const daysLeft = Math.max(getDDay(periodEnd), 1)
    const dailyBudget = Math.round(amount / daysLeft)

    return (
      <div className="screen plan-setup-screen">
        <header className="page-head">
          <BackButton onClick={() => setStep('form')} />
        </header>

        <div className="plan-confirm-card">
          <div className="speech-bubble">
            <p>오케이! 그럼 하루에 {formatWon(dailyBudget)} 소비하면 적절해요!</p>
          </div>
          <Character size={140} />
        </div>

        <button type="button" className="save-btn" onClick={handleFinish}>
          완료
        </button>
      </div>
    )
  }

  return (
    <div className="screen plan-setup-screen">
      <header className="page-head">
        <BackButton onClick={() => navigate(-1)} />
      </header>

      <h1 className="plan-title">이번엔</h1>

      <div className="period-row">
        <button
          type="button"
          className={`pill${periodMode === 'payday' ? ' selected' : ''}`}
          onClick={() => setPeriodMode('payday')}
        >
          월급날
        </button>
        <button
          type="button"
          className={`pill${periodMode === 'nextweek' ? ' selected' : ''}`}
          onClick={() => setPeriodMode('nextweek')}
        >
          다음주
        </button>
        <button
          type="button"
          className={`pill${periodMode === 'custom' ? ' selected' : ''}`}
          onClick={() => setPeriodMode('custom')}
        >
          직접입력
        </button>
        <span className="period-suffix">까지</span>
      </div>

      {periodMode === 'custom' && (
        <input
          type="date"
          className="date-input"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      )}

      {periodEnd && <p className="period-hint">{formatDateKo(periodEnd)}까지예요</p>}

      <div className="amount-field">
        <div className="amount-input-row">
          <span className="amount-display">{formatAmount(amountDigits)}원</span>
          {amountDigits && (
            <button type="button" className="amount-clear" onClick={() => setAmountDigits('')} aria-label="지우기">
              ×
            </button>
          )}
        </div>
        <p className="amount-suffix">으로 버틸거에요</p>
      </div>

      <button
        type="button"
        className="next-btn"
        disabled={!canProceed}
        onClick={() => canProceed && setStep('confirm')}
      >
        다음
      </button>

      <NumberPad onDigit={handleDigit} onBackspace={handleBackspace} maxLength={MAX_AMOUNT_DIGITS} />
    </div>
  )
}

export default PlanSetup
