// 텅장이 마스코트 캐릭터. 일러스트 파일이 없어 인라인 SVG로 대체.
// 디자인 이미지(PNG/SVG)가 추가되면 이 컴포넌트 내부만 <img> 태그로 교체.
// ForecastCard 등 사용하는 쪽 코드는 변경 불필요.
function Character({ mood = 'worried', size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="텅장이 캐릭터"
    >
      <circle cx="60" cy="62" r="46" fill="#E9E9EE" />

      {/* 몸통 / 후드티 */}
      <path
        d="M28 108c1-20 12-32 32-32s31 12 32 32z"
        fill="#8CA0C9"
      />
      <path
        d="M28 108c1-20 12-32 32-32s31 12 32 32"
        fill="none"
        stroke="#6C82AD"
        strokeWidth="2"
      />
      <path
        d="M46 80c4 6 24 6 28 0"
        fill="none"
        stroke="#6C82AD"
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

      {/* 눈썹 (걱정스러운 표정) */}
      <path d="M44 49c3-3 8-4 11-2" fill="none" stroke="#4A2F1C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 47c3-2 8-1 11 2" fill="none" stroke="#4A2F1C" strokeWidth="2.5" strokeLinecap="round" />

      {/* 눈 (살짝 아래를 보는 걱정스러운 눈) */}
      <circle cx="49" cy="59" r="3.4" fill="#2B2233" />
      <circle cx="69" cy="59" r="3.4" fill="#2B2233" />

      {/* 입 (당황한 "oh no" 입) */}
      <ellipse cx="59" cy="73" rx="4.2" ry="5" fill="#B36B4A" opacity="0.85" />

      {/* 볼터치 */}
      <circle cx="42" cy="65" r="4" fill="#FFB6A0" opacity="0.6" />
      <circle cx="78" cy="65" r="4" fill="#FFB6A0" opacity="0.6" />

      {/* 손 (걱정스럽게 뺨 쪽으로 든 손) */}
      <path d="M80 98c2-14 6-26 13-34" fill="none" stroke="#6C82AD" strokeWidth="10" strokeLinecap="round" />
      <circle cx="94" cy="63" r="8" fill="#FFDCB8" />
    </svg>
  )
}

export default Character
