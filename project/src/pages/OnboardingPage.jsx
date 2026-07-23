import { useNavigate } from "react-router-dom";
import characterImg from "../assets/character.png";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    // 전체 컨테이너를 화면 높이(h-dvh)에 딱 맞추고 스크롤 방지(overflow-hidden)
    <div className="relative mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-white px-6 pt-16 sm:pt-24 overflow-hidden">
      {/* 1. 상단 텍스트 영역 (크기 고정) */}
      <div className="shrink-0 flex flex-col items-center text-center">
        <h1 className="text-5xl font-black tracking-tight text-black">
          텅장이
        </h1>
        <p className="mt-3 text-lg font-medium text-gray-700">
          너는 사고 싶고, 나는 살고 싶어
        </p>
      </div>

      {/* 2. 시작하기 버튼 영역 (크기 고정, 캐릭터 위로 띄움) */}
      <div className="mt-10 w-full shrink-0 z-10">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full rounded-2xl bg-[#FF7051] py-4 text-center text-lg font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
        >
          시작하기
        </button>
      </div>

      {/* 3. 하단 캐릭터 영역 (남는 공간 모두 차지, 화면 크기에 맞춰 비율 자동 조절) */}
      <div className="flex w-full flex-1 items-end justify-center min-h-0 mt-2">
        <img
          src={characterImg}
          alt="텅장이 캐릭터"
          // 너비 한계를 풀고(w-[130%]), 높이는 남은 공간에 꽉 차게(h-full) 설정하여 캐릭터를 키움
          className="w-[130%] max-w-[400px] h-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}
