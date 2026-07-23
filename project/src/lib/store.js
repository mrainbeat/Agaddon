const STORAGE_KEY = 'tungjangi:data:v1'
const TOKEN_KEY = 'accessToken'
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isLoggedIn() {
  return Boolean(getToken())
}

async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  } catch (err) {
    throw new Error('서버에 연결할 수 없어요. 인터넷 연결을 확인해줘.')
  }

  const body = await res.json().catch(() => null)

  if (!res.ok || (body && body.isSuccess === false)) {
    const message = body?.message || `요청에 실패했어요 (${res.status})`
    throw new Error(message)
  }

  return body?.result
}

export async function fetchHome() {
  return apiFetch('/api/v1/home')
}

export async function savePlanApi({ payDay, monthlyBudget, characterType }) {
  return apiFetch('/api/v1/plans', {
    method: 'POST',
    body: JSON.stringify({ payDay, monthlyBudget, characterType }),
  })
}

export async function postExpenseApi({ category, amount, expenseDate, memo }) {
  return apiFetch('/api/v1/expenses', {
    method: 'POST',
    body: JSON.stringify({ category, amount, expenseDate, memo }),
  })
}

export async function postSubscriptionApi({ paymentName, amount, billingDay }) {
  return apiFetch('/api/v1/subscriptions', {
    method: 'POST',
    body: JSON.stringify({ paymentName, amount, billingDay }),
  })
}

export async function toggleSubscriptionApi(paymentId) {
  return apiFetch(`/api/v1/subscriptions/${paymentId}/toggle`, { method: 'PATCH' })
}

export const CHARACTER_TYPES = [
  { value: 'DEFAULT', label: '기본' },
  { value: 'BEGGAR', label: '거지' },
  { value: 'EMPTY_ACCOUNT', label: '텅장' },
  { value: 'FLEX', label: '플렉스' },
]

export const EXPENSE_CATEGORIES = ['식비', '쇼핑', '교통', '문화/여가', '기타']

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

function createDefaultData() {
  const today = new Date()
  return {
    profile: {
      nickname: '기명',
      streakDays: 6,
      streakMax: 8,
      lastActiveDate: toISODate(today),
    },
    budget: {
      maxAmount: 600000,
      spentAmount: 460000,
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

export async function loadData() {
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

export async function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return data
}

export async function resetData() {
  const seeded = createDefaultData()
  await saveData(seeded)
  return seeded
}

export async function rollPaydayIfPassed(data) {
  const today = toISODate(new Date())
  if (data.budget.nextPayday < today) {
    const rolled = addDays(new Date(data.budget.nextPayday), 30)
    const next = {
      ...data,
      budget: { ...data.budget, nextPayday: toISODate(rolled) },
    }
    await saveData(next)
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

export function getNextSubscription(subscriptions) {
  return getUpcomingSubscriptions(subscriptions)[0] ?? null
}

export function getUpcomingSubscriptions(subscriptions) {
  const today = toISODate(new Date())
  return subscriptions
    .filter((s) => s.nextDate >= today)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
}

export async function touchStreak(data) {
  const today = toISODate(new Date())
  const { lastActiveDate, streakDays, streakMax } = data.profile

  if (lastActiveDate === today) return data

  const yesterday = toISODate(addDays(new Date(), -1))
  const nextStreak = lastActiveDate === yesterday ? Math.min(streakDays + 1, streakMax) : 1

  const next = {
    ...data,
    profile: { ...data.profile, streakDays: nextStreak, lastActiveDate: today },
  }
  await saveData(next)
  return next
}

export async function saveBudgetPlan(data, { periodEnd, maxAmount }) {
  const next = {
    ...data,
    budget: { ...data.budget, nextPayday: periodEnd, maxAmount },
  }
  await saveData(next)
  return next
}

export const SURVIVAL_ITEM_LABEL = '삼각김밥 2개'
export const SURVIVAL_DAILY_AMOUNT = 3200

export async function addExpense(data, { merchant, amount }) {
  const entry = {
    id: `exp-${Date.now()}`,
    merchant,
    amount,
    date: toISODate(new Date()),
  }
  const next = {
    ...data,
    budget: { ...data.budget, spentAmount: data.budget.spentAmount + amount },
    history: [entry, ...data.history],
  }
  await saveData(next)
  return next
}

export function getDailyAvailable(budget) {
  const remaining = budget.maxAmount - budget.spentAmount
  const daysLeft = Math.max(getDDay(budget.nextPayday), 1)
  return Math.round(remaining / daysLeft)
}

export function formatWon(amount) {
  return `${amount.toLocaleString('ko-KR')}원`
}

export function formatDateKo(isoDate) {
  const d = new Date(isoDate)
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
}
