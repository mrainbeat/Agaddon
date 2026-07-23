import React from "react";
import { Link } from "react-router-dom";

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

  const rowClass =
    "w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors";

  function Row({ title }) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className="w-full max-w-[430px] bg-white mx-auto relative border-x border-gray-100 overflow-hidden pb-2">
      <header className="px-5 pt-12 pb-5 flex items-end justify-between border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warn text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7Z" />
            </svg>
          </div>
          <h1 className="text-[22px] font-bold text-black tracking-tight">
            김거지
          </h1>
        </div>
        <button className="text-[13px] text-[#b3b3b3] font-medium hover:text-gray-600 transition-colors">
          고객센터
        </button>
      </header>

      <main className="flex flex-col">
        <div className="py-2">
          {section1.map((title, idx) =>
            title === "생활비 설정" ? (
              <Link key={idx} to="/plan" className={rowClass}>
                <Row title={title} />
              </Link>
            ) : (
              <button key={idx} className={rowClass}>
                <Row title={title} />
              </button>
            ),
          )}
        </div>

        <div className="h-px bg-[#f0f0f0] mx-5" />

        <div className="py-2">
          {section2.map((title, idx) => (
            <button key={idx} className={rowClass}>
              <Row title={title} />
            </button>
          ))}
        </div>

        <div className="h-px bg-[#f0f0f0] mx-5" />

        <div className="pt-2">
          <button className={rowClass}>
            <Row title="로그아웃" />
          </button>
        </div>
      </main>
    </div>
  );
}
