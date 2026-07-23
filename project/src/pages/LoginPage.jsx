import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logincharacterImg from "../assets/logincharacter.png"; // 이미지 위치에 따라 경로 확인
import arrowIcon from "../assets/arrow.svg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const navigate = useNavigate();

  // 폼 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 200) {
        // 로그인 성공 시 발급받은 JWT 토큰 저장
        localStorage.setItem("accessToken", result.data.accessToken);

        // 홈 화면으로 이동
        navigate("/home", { replace: true });
      } else {
        alert(
          result.message ||
            "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 OAuth2 인증 주소로 페이지 전체 이동
    window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-white px-6 pt-4">
      {" "}
      <div className="w-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 w-fit p-1"
          aria-label="뒤로가기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* 헤더 타이틀 */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            만나서 반가워요!
          </h1>
          <h2 className="mt-4 text-xl font-bold text-gray-800">로그인</h2>
        </div>

        {/* 일반 로그인 폼 */}
        <form onSubmit={handleLogin} className="flex w-full flex-col">
          {/* 이메일 입력 */}
          <div className="mb-5 flex flex-col">
            <label
              className="mb-2 text-sm font-bold text-gray-800"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
              required
              className="border-b border-gray-200 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-8 flex flex-col">
            <label
              className="mb-2 text-sm font-bold text-gray-800"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              required
              className="border-b border-gray-200 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#FF7051] py-4 text-center text-lg font-bold text-white transition-transform active:scale-[0.98]"
          >
            로그인
          </button>
        </form>

        {/* 서브 링크 영역 */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm font-medium text-gray-500">
          <button type="button" className="hover:text-gray-800">
            아이디 찾기
          </button>
          <span className="text-gray-300">|</span>
          <button type="button" className="hover:text-gray-800">
            비밀번호 찾기
          </button>
          <span className="text-gray-300">|</span>
          <button type="button" className="hover:text-gray-800">
            회원가입
          </button>
        </div>

        {/* 간편 로그인 구분선 */}
        <div className="my-6 flex items-center justify-center">
          <hr className="w-full border-gray-200" />
          <span className="shrink-0 px-4 text-sm font-medium text-gray-400">
            간편 로그인
          </span>
          <hr className="w-full border-gray-200" />
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#FEE500] py-4 text-lg font-bold text-black transition-transform active:scale-[0.98]"
        >
          <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current">
            <path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.44 5.44c-.16.48.4.88.8.64l6.4-4.4c.4.08.72.08 1.12.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z" />
          </svg>
          <span>카카오로 로그인</span>
        </button>
      </div>
      {/* 우측 하단 캐릭터 */}
      {/* mt-auto를 사용하여 상단 콘텐츠 아래 남는 공간을 모두 밀어내어 자연스럽게 하단에 배치 */}
      <div className="mt-auto flex w-full justify-end pointer-events-none -mr-4 pb-2">
        <img
          src={logincharacterImg}
          alt="로그인 캐릭터"
          className="w-40 sm:w-48 object-contain"
        />
      </div>
    </div>
  );
}
