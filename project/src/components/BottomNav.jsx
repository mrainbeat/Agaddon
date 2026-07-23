import { NavLink } from 'react-router-dom'

const ACTIVE_CLASS = 'text-warn'

const TABS = [
  {
    to: '/',
    label: '홈',
    icon: (
      <path d="M4 11.5 12 5l8 6.5M6 10v9h12v-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    to: '/friends',
    label: '친구',
    icon: (
      <>
        <circle cx="9" cy="8.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 19c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15.2 13.7c2.4.2 4.3 2.1 4.3 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    to: '/records',
    label: '기록',
    icon: (
      <>
        <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    to: '/my',
    label: '마이',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 19.5c0-3.9 3.1-6.2 7-6.2s7 2.3 7 6.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
]

function BottomNav() {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 flex border-t border-line-soft bg-surface px-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] pt-2"
      aria-label="주요 메뉴"
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold no-underline ${
              isActive ? ACTIVE_CLASS : 'text-ink-muted'
            }`
          }
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {tab.icon}
          </svg>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
