import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Character from '../components/Character.jsx'
import NumberPad from '../components/NumberPad.jsx'
import {
  addDays,
  toISODate,
  formatWon,
  formatDateKo,
  savePlanApi,
  CHARACTER_TYPES,
} from '../lib/store.js'

const MAX_AMOUNT_DIGITS = 10

function BackButton({ onClick }) {
  return (
    <button type="button" className="-ml-1 flex p-1 text-ink" onClick={onClick} aria-label="뒤로 가기">
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

function PlanSetup() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form')
  const [periodMode, setPeriodMode] = useState(null)
  const [customDate, setCustomDate] = useState('')
  const [amountDigits, setAmountDigits] = useState('')
  const [characterType, setCharacterType] = useState(CHARACTER_TYPES[0].value)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const periodEnd =
    periodMode === 'payday'
      ? toISODate(addDays(new Date(), 30))
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

  async function handleFinish() {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const payDay = new Date(periodEnd).getDate()
      await savePlanApi({ payDay, monthlyBudget: amount, characterType })
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const pillClass = (selected) =>
    `rounded-full border-[1.5px] px-4 py-2 text-sm font-bold ${
      selected ? 'border-warn text-warn' : 'border-line-soft text-ink-muted'
    }`

  if (step === 'confirm') {
    const daysLeft = Math.max(
      Math.round((new Date(periodEnd) - new Date()) / (1000 * 60 * 60 * 24)),
      1,
    )
    const dailyBudget = Math.round(amount / daysLeft)

    return (
      <div className="flex flex-col gap-4 px-5 pb-2 pt-5">
        <header className="flex items-center gap-2">
          <BackButton onClick={() => setStep('form')} />
        </header>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="relative max-w-[300px] rounded-2xl bg-accent-soft px-4 py-3 text-center after:absolute after:-bottom-2 after:left-1/2 after:border-8 after:border-transparent after:border-b-0 after:border-t-accent-soft after:content-[''] after:[transform:translateX(-50%)]">
            <p className="text-[22px] font-bold leading-[140%] tracking-[-0.22px] text-[#6B493D]">
              오케이! 그럼 하루에 {formatWon(dailyBudget)} 소비하면 적절해요!
            </p>
          </div>
          <Character size={140} />
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-ink">어떤 캐릭터로 보여줄까?</p>
          <div className="flex flex-wrap gap-2">
            {CHARACTER_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={pillClass(characterType === type.value)}
                onClick={() => setCharacterType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm font-semibold text-danger">{error}</p>}

        <button
          type="button"
          disabled={submitting}
          className="mt-2 rounded-2xl bg-ink py-4 text-[15px] font-bold text-white disabled:opacity-50"
          onClick={handleFinish}
        >
          {submitting ? '저장 중...' : '완료'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[18px] px-5 pb-2 pt-5">
      <header className="flex flex-col gap-3 border-b border-line-soft pb-4">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-lg font-bold">예산 입력</h1>
      </header>

      <h2 className="text-[22px] font-extrabold">이번엔</h2>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={pillClass(periodMode === 'payday')} onClick={() => setPeriodMode('payday')}>
          월급날
        </button>
        <button
          type="button"
          className={pillClass(periodMode === 'nextweek')}
          onClick={() => setPeriodMode('nextweek')}
        >
          다음주
        </button>
        <button type="button" className={pillClass(periodMode === 'custom')} onClick={() => setPeriodMode('custom')}>
          직접입력
        </button>
        <span className="ml-0.5 text-lg font-extrabold">까지</span>
      </div>

      {periodMode === 'custom' && (
        <input
          type="date"
          className="w-fit rounded-[10px] border-[1.5px] border-line-soft px-3 py-2.5 text-sm text-ink"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      )}

      {periodEnd && <p className="text-[13px] font-semibold text-ink-muted">{formatDateKo(periodEnd)}까지예요</p>}

      <div className="mt-3">
        <div className="flex items-center justify-between border-b-2 border-line pb-2.5">
          <span className="text-[32px] font-extrabold text-ink">{formatAmount(amountDigits)}원</span>
          <button
            type="button"
            className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-line-soft text-[15px] leading-none text-ink-muted"
            onClick={() => setAmountDigits('')}
            aria-label="지우기"
          >
            ×
          </button>
        </div>
        <p className="mt-2.5 text-right text-base font-bold text-ink">으로 버틸거에요</p>
      </div>

      <NumberPad
        onDigit={handleDigit}
        onBackspace={handleBackspace}
        maxLength={MAX_AMOUNT_DIGITS}
        actionLabel="입력"
        actionDisabled={!canProceed}
        onAction={() => canProceed && setStep('confirm')}
      />
    </div>
  )
}

export default PlanSetup
