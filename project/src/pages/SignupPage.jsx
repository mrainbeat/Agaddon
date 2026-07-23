import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../lib/store.js'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export default function SignupPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    try {
      const signupRes = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      })
      const signupResult = await signupRes.json()

      if (!signupRes.ok || signupResult.isSuccess === false) {
        setError(signupResult.message || '회원가입에 실패했어요.')
        setSubmitting(false)
        return
      }

      const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const loginResult = await loginRes.json()

      if (loginRes.ok && loginResult.isSuccess) {
        setToken(loginResult.result.accessToken)
        navigate('/home', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('서버와 통신 중 오류가 발생했어요.')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-white px-6 pt-4">
      <div className="w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 w-fit p-1"
          aria-label="뒤로가기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">반가워요!</h1>
          <h2 className="mt-4 text-xl font-bold text-gray-800">회원가입</h2>
        </div>

        <form onSubmit={handleSignup} className="flex w-full flex-col">
          <div className="mb-5 flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-800" htmlFor="nickname">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요."
              required
              className="border-b border-gray-200 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none"
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-800" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
              required
              className="border-b border-gray-200 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none"
            />
          </div>

          <div className="mb-8 flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-800" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              required
              className="border-b border-gray-200 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none"
            />
          </div>

          {error && <p className="mb-4 text-sm font-semibold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#FF795B] py-4 text-center text-lg font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center text-sm font-medium text-gray-500">
          <span>이미 계정이 있으신가요?</span>
          <button
            type="button"
            className="ml-2 font-bold text-[#FF795B]"
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
