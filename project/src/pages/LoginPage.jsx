import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-[430px] bg-white mx-auto min-h-screen relative border-x border-gray-100 flex flex-col">
      {/* 1. 상단 헤더 (뒤로가기 & 타이틀) */}
      <header className="px-5 pt-12 pb-6">
        <button className="mb-6 hover:opacity-70 transition-opacity">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-[22px] font-bold text-black tracking-tight">
          로그인
        </h1>
      </header>

      {/* 2. 메인 폼 영역 */}
      <main className="px-5 flex-1 flex flex-col">
        {/* 이메일 입력 */}
        <div className="mb-8">
          <label className="block text-[15px] font-bold text-black mb-3">
            이메일
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className="w-full pb-3 border-b border-[#e5e5e5] text-[15px] placeholder-[#b3b3b3] focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-10">
          <label className="block text-[15px] font-bold text-black mb-3">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="w-full pb-3 border-b border-[#e5e5e5] text-[15px] placeholder-[#b3b3b3] focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* 메인 로그인 버튼 */}
        <button className="w-full bg-[#ff7b60] text-white font-bold text-[16px] py-4 rounded-xl mb-6 hover:bg-[#fa6048] transition-colors">
          로그인
        </button>

        {/* 서브 링크 */}
        <div className="flex justify-center items-center gap-3 text-[13px] text-[#666666] font-medium mb-12">
          <button className="hover:text-black transition-colors">
            아이디 찾기
          </button>
          <span className="text-[#cccccc]">|</span>
          <button className="hover:text-black transition-colors">
            비밀번호 찾기
          </button>
          <span className="text-[#cccccc]">|</span>
          <button className="hover:text-black transition-colors">
            회원가입
          </button>
        </div>

        {/* 구분선 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[#e5e5e5]"></div>
          <span className="text-[13px] text-[#999999] font-medium">
            간편 로그인
          </span>
          <div className="flex-1 h-px bg-[#e5e5e5]"></div>
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={() => {
            alert("카카오 로그인 연동 대기 중입니다.");
          }}
          className="w-full bg-[#FEE500] text-black font-bold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f4dc00] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="black">
            <path d="M9 3C4.58172 3 1 5.91015 1 9.5C1 11.5796 2.18957 13.4338 4.02534 14.6156C3.84277 15.2892 3.23727 17.1593 3.20815 17.2562C3.20815 17.2562 3.16788 17.3751 3.24355 17.4173C3.31921 17.4595 3.4116 17.414 3.4116 17.414C3.80584 17.1648 6.46743 15.3999 7.07844 14.9818C7.69837 15.1199 8.33967 15.2 9 15.2C13.4183 15.2 17 12.2899 17 8.7C17 5.11015 13.4183 2.2 9 2.2V3Z" />
          </svg>
          카카오로 로그인
        </button>
      </main>
    </div>
  );
}
