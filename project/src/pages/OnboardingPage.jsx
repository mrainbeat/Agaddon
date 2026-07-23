import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg"; // 로고 이미지
import characterImg from "../assets/character.png"; // 하단 캐릭터 이미지 (경로/파일명 확인해주세요!)

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    /* h-dvh와 overflow-hidden으로 스크롤 방지 및 한 화면 고정 */
    <div className="font-['RiaSans'] mx-auto flex h-dvh w-full max-w-[430px] flex-col items-center overflow-hidden bg-white px-6">
      {/* 1. 상단 여백 (화면 비율에 맞춰 자동 조절) */}
      <div className="flex-[0.8] w-full"></div>

      {/* 2. 메인 콘텐츠 (로고 + 텍스트 + 버튼) */}
      <div className="flex w-full flex-col z-10">
        {/* 로고 & 서브타이틀 (우측 정렬 느낌을 살리기 위해 items-end 사용) */}
        <div className="flex flex-col items-end self-center">
          <img src={Logo} alt="텅장이 로고" className="w-56 object-contain" />
        </div>

        {/* 시작하기 버튼 */}
        <button
          onClick={() => navigate("/login")}
          className="mt-16 w-full rounded-xl bg-[#FF7051] py-4 text-center text-lg font-bold text-white transition-transform active:scale-[0.98]"
        >
          시작하기
        </button>
      </div>

      {/* 3. 중간 여백 (버튼과 캐릭터 사이 공간 유연하게 확보) */}
      <div className="w-full h-6"></div>

      {/* 4. 하단 캐릭터 (화면 바닥에 밀착 및 살짝 잘리는 연출) */}
      <div className="w-full flex justify-center mt-auto pointer-events-none">
        <img
          src={characterImg}
          alt="온보딩 캐릭터"
          /* translate-y-4를 주어 원본 사진처럼 밑부분이 자연스럽게 화면 밖으로 잘리게 연출 */
          className="w-11/12 max-w-[320px] object-cover translate-y-4"
        />
      </div>
    </div>
  );
}
