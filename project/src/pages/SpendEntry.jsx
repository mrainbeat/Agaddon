import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Character from '../components/Character.jsx'
import NumberPad from '../components/NumberPad.jsx'
import SpendingBar from '../components/SpendingBar.jsx'
import {
  loadData,
  addExpense,
  getDailyAvailable,
  formatWon,
  SURVIVAL_DAILY_AMOUNT,
} from '../lib/store.js'

const MAX_AMOUNT_DIGITS = 10
const MERCHANT_PRESETS = ['쿠팡', '무신사']

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

function buildReactionMessage(dailyAvailable) {
  if (dailyAvailable <= 0) {
    return '오늘 쓸 수 있는 돈이 이미 없어... 정말 조심하자ㅠㅠ'
  }
  if (dailyAvailable <= SURVIVAL_DAILY_AMOUNT) {
    return '이젠 삼각김밥을 자주 먹는게 좋겠어요.. ㅎㅎ'
  }
  if (dailyAvailable <= 15000) {
    return '오늘 하루는 좀 아껴야겠다!'
  }
  return '아직 여유있어! 계속 이 페이스 유지하자'
}

function SpendEntry() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [step, setStep] = useState('form')
  const [merchantMode, setMerchantMode] = useState(null)
  const [customMerchant, setCustomMerchant] = useState('')
  const [amountDigits, setAmountDigits] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      const loaded = await loadData()
      if (!cancelled) setData(loaded)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (!data) return null

  const merchant =
    merchantMode === 'custom' ? customMerchant.trim() : merchantMode

  const amount = Number(amountDigits || 0)
  const canProceed = Boolean(merchant) && amount > 0

  function handleDigit(digit) {
    setAmountDigits((prev) => (prev.length >= MAX_AMOUNT_DIGITS ? prev : prev + digit))
  }

  function handleBackspace() {
    setAmountDigits((prev) => prev.slice(0, -1))
  }

  async function handleFinish() {
    const updated = await addExpense(data, { merchant, amount })
    setData(updated)
    navigate('/')
  }

  const pillClass = (selected) =>
    `rounded-full border-[1.5px] px-4 py-2 text-sm font-bold ${
      selected ? 'border-ink bg-accent-soft text-ink' : 'border-line-soft text-ink-muted'
    }`

  if (step === 'confirm') {
    const previewData = {
      ...data,
      budget: { ...data.budget, spentAmount: data.budget.spentAmount + amount },
    }
    const dailyAvailable = getDailyAvailable(previewData.budget)

    return (
      <div className="flex flex-col gap-4 px-5 pb-2 pt-5">
        <header className="flex items-center gap-2">
          <BackButton onClick={() => setStep('form')} />
        </header>

        <div>
          <p className="text-[13px] font-medium text-ink-muted">오늘의 소비가능 금액</p>
          <h1 className="text-2xl font-bold tracking-tight">{formatWon(Math.max(dailyAvailable, 0))}</h1>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="relative max-w-[300px] rounded-2xl bg-accent-soft px-4 py-3 text-center after:absolute after:-bottom-2 after:left-1/2 after:border-8 after:border-transparent after:border-b-0 after:border-t-accent-soft after:content-[''] after:[transform:translateX(-50%)]">
            <p className="text-sm font-semibold leading-relaxed text-ink">{buildReactionMessage(dailyAvailable)}</p>
          </div>
          <Character size={140} />
        </div>

        <SpendingBar spentAmount={previewData.budget.spentAmount} maxAmount={previewData.budget.maxAmount} />

        <button
          type="button"
          className="mt-2 rounded-2xl bg-ink py-4 text-[15px] font-bold text-white"
          onClick={handleFinish}
        >
          완료
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[18px] px-5 pb-2 pt-5">
      <header className="flex items-center gap-2">
        <BackButton onClick={() => navigate(-1)} />
      </header>

      <h1 className="text-[22px] font-extrabold">방금</h1>

      <div className="flex flex-wrap items-center gap-2">
        {MERCHANT_PRESETS.map((label) => (
          <button
            key={label}
            type="button"
            className={pillClass(merchantMode === label)}
            onClick={() => setMerchantMode(label)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={pillClass(merchantMode === 'custom')}
          onClick={() => setMerchantMode('custom')}
        >
          직접입력
        </button>
        <span className="ml-0.5 text-lg font-extrabold">에서</span>
      </div>

      {merchantMode === 'custom' && (
        <input
          type="text"
          placeholder="예: 스타벅스"
          className="w-full rounded-[10px] border-[1.5px] border-line-soft px-3 py-2.5 text-sm text-ink"
          value={customMerchant}
          onChange={(e) => setCustomMerchant(e.target.value)}
        />
      )}

      <div className="mt-3">
        <div className="flex items-center justify-between border-b-2 border-line pb-2.5">
          <span className="text-[32px] font-extrabold text-ink">{formatAmount(amountDigits)}원</span>
          {amountDigits && (
            <button
              type="button"
              className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-line-soft text-[15px] leading-none text-ink-muted"
              onClick={() => setAmountDigits('')}
              aria-label="지우기"
            >
              ×
            </button>
          )}
        </div>
        <p className="mt-2.5 text-right text-base font-bold text-ink">소비했어요</p>
      </div>

      <button
        type="button"
        className="mt-5 rounded-2xl bg-warn py-[15px] text-[15px] font-bold text-white disabled:bg-line-soft disabled:text-ink-muted"
        disabled={!canProceed}
        onClick={() => canProceed && setStep('confirm')}
      >
        다음
      </button>

      <NumberPad onDigit={handleDigit} onBackspace={handleBackspace} maxLength={MAX_AMOUNT_DIGITS} />
    </div>
  )
}

export default SpendEntry
