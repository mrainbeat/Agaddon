import React from "react";

export default function MyPage() {
  const section1 = [
    "프로필 수정",
    "공개설정",
    "생활비 설정",
    "알림 설정",
    "구독 관리",
  ];

  const section2 = [
    "고객센터",
    "이용 약관",
    "개인정보 처리방침",
    "회사 세부정보",
  ];

  return (
    // min-h-svh 제거 -> 화면 전체를 무조건 채우지 않고 컨텐츠 크기에 맞춤
    <div className="w-full max-w-[430px] bg-white mx-auto relative border-x border-gray-100 overflow-hidden pb-2">
      {/* 1. 상단 헤더 */}
      <header className="px-5 pt-12 pb-5 flex items-end justify-between border-b border-[#f0f0f0]">
        <h1 className="text-[22px] font-bold text-black tracking-tight">
          김거지
        </h1>
        <button className="text-[13px] text-[#b3b3b3] font-medium hover:text-gray-600 transition-colors">
          고객센터
        </button>
      </header>

      {/* 2. 메인 리스트 영역 */}
      <main className="flex flex-col">
        {/* 그룹 1 */}
        <div className="py-2">
          {section1.map((title, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
                <span className="text-[15px] text-[#333333] font-medium">
                  {title}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-[#cccccc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#f0f0f0] mx-5" />

        {/* 그룹 2 */}
        <div className="py-2">
          {section2.map((title, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
                <span className="text-[15px] text-[#333333] font-medium">
                  {title}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-[#cccccc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#f0f0f0] mx-5" />

        {/* 그룹 3 (로그아웃) */}
        <div className="pt-2">
          <button className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
              <span className="text-[15px] text-[#333333] font-medium">
                로그아웃
              </span>
            </div>
            <svg
              className="w-4 h-4 text-[#cccccc]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
