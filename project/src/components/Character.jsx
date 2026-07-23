function Character({ mood = "worried", size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="텅장이 캐릭터"
    >
      <circle cx="60" cy="62" r="46" fill="#EFE6FF" />

      {/* 몸통 / 후드티 */}
      <path d="M28 108c1-20 12-32 32-32s31 12 32 32z" fill="#5B6BF5" />
      <path
        d="M28 108c1-20 12-32 32-32s31 12 32 32"
        fill="none"
        stroke="#4453D8"
        strokeWidth="2"
      />
      <path
        d="M46 80c4 6 24 6 28 0"
        fill="none"
        stroke="#4453D8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 얼굴 */}
      <circle cx="60" cy="56" r="30" fill="#FFDCB8" />

      {/* 머리카락 */}
      <path
        d="M31 52c-2-18 12-30 29-30s31 12 29 30c-6-8-16-6-29-14-9 8-23 6-29 14z"
        fill="#6B4A2E"
      />

      {/* 눈썹 */}
      <path
        d="M45 50c3-3 8-3 11-1"
        fill="none"
        stroke="#4A2F1C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M64 49c3-2 8-2 11 1"
        fill="none"
        stroke="#4A2F1C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 눈 */}
      <circle cx="50" cy="58" r="3.4" fill="#2B2233" />
      <circle cx="70" cy="58" r="3.4" fill="#2B2233" />

      {/* 입 */}
      <path
        d="M52 70c4 3 12 3 16 0"
        fill="none"
        stroke="#B36B4A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* 볼터치 */}
      <circle cx="42" cy="65" r="4" fill="#FFB6A0" opacity="0.6" />
      <circle cx="78" cy="65" r="4" fill="#FFB6A0" opacity="0.6" />

      {/* 손 */}
      <circle cx="94" cy="88" r="8" fill="#FFDCB8" />
      <path
        d="M84 100c2-8 6-12 10-14"
        fill="none"
        stroke="#4453D8"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Character;
