const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

// 예산 금액 입력용 커스텀 숫자 키패드.
// 네이티브 모바일 키보드 대신 화면 안에서 직접 그려서 디자인과 동일하게 맞춘다.
function NumberPad({ onDigit, onBackspace, maxLength = 10 }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-1">
      {KEYS.map((key, i) => {
        if (key === '') return <div key={`empty-${i}`} className="pointer-events-none" aria-hidden="true" />

        if (key === 'back') {
          return (
            <button
              key="back"
              type="button"
              className="flex items-center justify-center rounded-xl py-4 text-ink-muted active:bg-line-soft"
              onClick={onBackspace}
              aria-label="지우기"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-6-6 6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M12 10l5 4M17 10l-5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          )
        }

        return (
          <button
            key={key}
            type="button"
            className="rounded-xl py-4 text-xl font-semibold text-ink active:bg-line-soft"
            onClick={() => onDigit(key, maxLength)}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}

export default NumberPad
