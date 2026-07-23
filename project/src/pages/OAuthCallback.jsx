import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../lib/store.js'

function OAuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('accessToken') || params.get('token')

    if (!token) {
      setError(true)
      return
    }

    setToken(token)
    navigate('/home', { replace: true })
  }, [navigate])

  return (
    <div className="flex h-dvh w-full max-w-[430px] mx-auto flex-col items-center justify-center gap-3 bg-white px-6 text-center">
      {error ? (
        <>
          <p className="text-base font-bold text-ink">로그인에 실패했어요</p>
          <button
            type="button"
            className="mt-2 rounded-xl bg-[#FF795B] px-6 py-3 text-sm font-bold text-white"
            onClick={() => navigate('/login', { replace: true })}
          >
            다시 로그인하기
          </button>
        </>
      ) : (
        <p className="text-sm font-medium text-ink-muted">로그인 처리 중이에요...</p>
      )}
    </div>
  )
}

export default OAuthCallback
