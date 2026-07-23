import { useState } from 'react'

// 마이페이지: 아직 실제 계좌 연동은 없어서(구현 안함) 버튼만 있는 상태로 둔다.
// 눌렀을 때 "연동 중" 흉내만 내고 실제 데이터 연결은 하지 않음.
function MyPage() {
  const [status, setStatus] = useState('idle') // idle | connecting | done

  function handleConnect() {
    if (status !== 'idle') return
    setStatus('connecting')
    setTimeout(() => setStatus('done'), 1200)
  }

  return (
    <div className="screen my-page">
      <h1>마이페이지</h1>

      <div className="account-link-card">
        <div>
          <p className="account-link-title">계좌 연동</p>
          <p className="account-link-desc">
            {status === 'done'
              ? '연동 완료! (데모용 화면이라 실제 계좌 정보는 가져오지 않아)'
              : '연동하면 소비 내역이 자동으로 채워져요'}
          </p>
        </div>
        <button
          type="button"
          className={`account-link-btn${status === 'done' ? ' done' : ''}`}
          onClick={handleConnect}
          disabled={status === 'connecting'}
        >
          {status === 'idle' && '연동하기'}
          {status === 'connecting' && '연동 중...'}
          {status === 'done' && '연동됨'}
        </button>
      </div>

      <p className="my-page-note">그 외 설정, 알림, 로그아웃 메뉴는 다음에 추가할게.</p>
    </div>
  )
}

export default MyPage
