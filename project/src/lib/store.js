// 텅장이 - 로컬 데이터 스토어
// 백엔드가 아직 없어서(계좌 연동 미구현) 브라우저 localStorage에 상태를 저장합니다.
// 나중에 실제 API가 붙으면 이 파일의 get/save 구현만 교체하면 되도록
// 화면 컴포넌트에서는 항상 이 모듈을 통해서만 데이터에 접근합니다.

const STORAGE_KEY = 'tungjangi:data:v1'

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function toISODate(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

// 기획 목업(4번 이미지)과 동일한 숫자로 시딩되는 기본 데이터
function createDefaultData() {
  const today = new Date()
  return {
    profile: {
      nickname: '기명',
      streakDays: 6, // 8칸 중 몇 칸 채울지 (오늘 접속분 포함, touchStreak가 관리)
      streakMax: 8,
      lastActiveDate: toISODate(today), // 시딩 시점을 "오늘 접속"으로 간주
    },
    budget: {
      // 이번 달 쓸 수 있는 최대 금액과, 지금까지 쓴 금액
      maxAmount: 600000,
      spentAmount: 460000,
      // 다음 월급날 (절대 날짜로 저장, 지나면 자동으로 한 달 뒤로 굴러감)
      nextPayday: toISODate(addDays(today, 12)),
    },
    subscriptions: [
      { id: 'sub-1', name: 'GPT Plus', amount: 33000, nextDate: toISODate(addDays(today, 3)) },
      { id: 'sub-2', name: 'Netflix', amount: 17000, nextDate: toISODate(addDays(today, 9)) },
      { id: 'sub-3', name: 'YouTube Premium', amount: 14900, nextDate: toISODate(addDays(today, 18)) },
    ],
    history: [],
  }
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = createDefaultData()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw)
  } catch (err) {
    console.warn('[store] localStorage를 읽지 못해 기본값으로 대체합니다', err)
    return createDefaultData()
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return data
}

export function resetData() {
  const seeded = createDefaultData()
  saveData(seeded)
  return seeded
}

// 월급날이 이미 지났으면 다음 달 같은 날짜로 굴려준다
export function rollPaydayIfPassed(data) {
  const today = toISODate(new Date())
  if (data.budget.nextPayday < today) {
    const rolled = addDays(new Date(data.budget.nextPayday), 30)
    const next = {
      ...data,
      budget: { ...data.budget, nextPayday: toISODate(rolled) },
    }
    saveData(next)
    return next
  }
  return data
}

export function getDDay(isoDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(isoDate)
  target.setHours(0, 0, 0, 0)
  const diffMs = target.getTime() - today.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

// 정기결제 중 가장 임박한 결제 하나를 찾는다 (지난 결제는 제외)
export function getNextSubscription(subscriptions) {
  return getUpcomingSubscriptions(subscriptions)[0] ?? null
}

// 지나지 않은 정기결제를 결제일이 빠른 순으로 전부 반환
export function getUpcomingSubscriptions(subscriptions) {
  const today = toISODate(new Date())
  return subscriptions
    .filter((s) => s.nextDate >= today)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
}

// 앱을 켤 때마다 호출: 연속 접속(스트릭)을 오늘 날짜 기준으로 갱신한다.
// - 오늘 이미 반영했으면 그대로
// - 어제까지 접속했으면 +1 (최대 streakMax)
// - 하루 이상 건너뛰었으면 1로 초기화
export function touchStreak(data) {
  const today = toISODate(new Date())
  const { lastActiveDate, streakDays, streakMax } = data.profile

  if (lastActiveDate === today) return data

  const yesterday = toISODate(addDays(new Date(), -1))
  const nextStreak = lastActiveDate === yesterday ? Math.min(streakDays + 1, streakMax) : 1

  const next = {
    ...data,
    profile: { ...data.profile, streakDays: nextStreak, lastActiveDate: today },
  }
  saveData(next)
  return next
}

// 플랜 세우기 화면에서 저장: 이번 플랜의 종료일(월급날 or 직접입력)과 예산 총액을 갱신한다
export function saveBudgetPlan(data, { periodEnd, maxAmount }) {
  const next = {
    ...data,
    budget: { ...data.budget, nextPayday: periodEnd, maxAmount },
  }
  saveData(next)
  return next
}

export function formatWon(amount) {
  return `${amount.toLocaleString('ko-KR')}원`
}

export function formatDateKo(isoDate) {
  const d = new Date(isoDate)
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
}
