import Character from './Character.jsx'
import { formatWon } from '../lib/store.js'

// "하루 생존 마지노선"으로 쓸 기준 스낵: 삼각김밥 2개
const SURVIVAL_ITEM_LABEL = '삼각김밥 2개'
const SURVIVAL_DAILY_AMOUNT = 3200

// 오늘의 소비예보 메시지 우선순위
// 1. 오늘 결제되는 정기결제가 있으면 그것부터 알림 (가장 확실하고 급한 정보)
// 2. 예산을 이미 넘었으면 초과 경고
// 3. 예산의 70% 이상을 썼으면: 앞으로 얼마나 더 쓰면 "하루 삼각김밥 2개" 수준까지
//    떨어지는지 계산해서 보여줌 (과소비 예방이라는 핵심 가치와 가장 맞닿아 있는 메시지)
// 4. 3일 안에 정기결제가 있으면 그 예고
// 5. 그 외엔 안심 메시지
function buildForecastMessage({ nextSub, budget }) {
  const { spentAmount, maxAmount, daysLeft } = budget
  const remaining = maxAmount - spentAmount
  const ratio = maxAmount > 0 ? spentAmount / maxAmount : 0
  const safeDays = Math.max(daysLeft, 1)

  if (nextSub && nextSub.daysLeft <= 0) {
    return `오늘 ${nextSub.name} (${formatWon(nextSub.amount)}) 결제일이야!`
  }

  if (remaining <= 0) {
    return `이번 플랜 예산을 이미 다 썼어... 남은 기간엔 정말 최소한으로만 쓰자ㅠ`
  }

  if (ratio >= 0.7) {
    const cushion = remaining - safeDays * SURVIVAL_DAILY_AMOUNT
    if (cushion > 0) {
      return `${formatWon(cushion)} 더 쓰면 하루를 ${SURVIVAL_ITEM_LABEL}(${formatWon(SURVIVAL_DAILY_AMOUNT)})로 버텨야해ㅜ`
    }
    return `지금부터는 하루 ${SURVIVAL_ITEM_LABEL}(${formatWon(SURVIVAL_DAILY_AMOUNT)}) 수준으로만 버틸 수 있어... 오늘은 진짜 아껴줘ㅠㅠ`
  }

  if (nextSub && nextSub.daysLeft <= 3) {
    return `${nextSub.daysLeft}일 뒤에 ${nextSub.name} (${formatWon(nextSub.amount)}) 결제가 있어!`
  }

  return '다가오는 정기결제가 없어! 이번 달은 든든하네 🙌'
}

// 캐릭터 + 말풍선: 박스 없이 화면 가운데에 크게 배치되는 영역.
// 부모가 flex-col이면 flex-1로 남는 세로 공간을 다 차지해서 스스로 가운데 정렬되고,
// 그 아래 소비 게이지는 자연스럽게 화면 하단 쪽으로 밀려난다.
function ForecastCard({ nextSub, budget }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-2">
      <div className="relative max-w-[300px] rounded-2xl bg-accent-soft px-4 py-3 text-center after:absolute after:-bottom-2 after:left-1/2 after:border-8 after:border-transparent after:border-b-0 after:border-t-accent-soft after:content-[''] after:[transform:translateX(-50%)]">
        <p className="text-sm font-semibold leading-relaxed text-ink">
          {buildForecastMessage({ nextSub, budget })}
        </p>
      </div>
      <Character size={190} />
    </div>
  )
}

export default ForecastCard
