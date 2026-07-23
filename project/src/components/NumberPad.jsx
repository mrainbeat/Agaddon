const KEYS = [
  { key: '1', letters: '' },
  { key: '2', letters: 'ABC' },
  { key: '3', letters: 'DEF' },
  { key: '4', letters: 'GHI' },
  { key: '5', letters: 'JKL' },
  { key: '6', letters: 'MNO' },
  { key: '7', letters: 'PQRS' },
  { key: '8', letters: 'TUV' },
  { key: '9', letters: 'WXYZ' },
  { key: '', letters: '' },
  { key: '0', letters: '' },
  { key: 'back', letters: '' },
]

function NumberPad({ onDigit, onBackspace, maxLength = 10, actionLabel, onAction, actionDisabled }) {
  return (
    <div className="-mx-5 mt-4 rounded-t-3xl bg-[#F1F1F5] px-4 pt-4 pb-2">
      {actionLabel && (
        <button
          type="button"
          className="mb-3 w-full rounded-2xl bg-warn py-3.5 text-[15px] font-bold text-white disabled:bg-line-soft disabled:text-ink-muted"
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

      <div className="grid grid-cols-3 gap-2">
        {KEYS.map(({ key, letters }, i) => {
          if (key === '') return <div key={`empty-${i}`} className="pointer-events-none" aria-hidden="true" />

          if (key === 'back') {
            return (
              <button
                key="back"
                type="button"
                className="flex items-center justify-center rounded-2xl bg-white py-3.5 text-ink-muted shadow-[0_1px_2px_rgba(20,18,40,0.06)] active:bg-line-soft"
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
              className="flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-white py-3 text-ink shadow-[0_1px_2px_rgba(20,18,40,0.06)] active:bg-line-soft"
              onClick={() => onDigit(key, maxLength)}
            >
              <span className="text-xl font-semibold">{key}</span>
              <span className="text-[9px] font-medium tracking-widest text-ink-muted">{letters}</span>
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-3 h-1 w-32 rounded-full bg-ink/80" />
    </div>
  )
}

export default NumberPad
