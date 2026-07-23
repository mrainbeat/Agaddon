import React from "react";
import { Link } from "react-router-dom";

// 아이콘 임포트 (회원탈퇴 아이콘을 smile로 변경)
import personIcon from "../assets/person.svg";
import VectorIcon from "../assets/Vector.svg";
import LifeIcon from "../assets/Life.svg";
import alamIcon from "../assets/alam.svg";
import cashIcon from "../assets/cash.svg";
import bookIcon from "../assets/book.svg";
import checkIcon from "../assets/check.svg";
import lockIcon from "../assets/lock.svg";
import contactIcon from "../assets/contact.svg";
import logoutIcon from "../assets/logout.svg";
import smileIcon from "../assets/smile.png"; // 확장자가 png라면 .png, svg라면 .svg로 확인해주세요!

export default function MyPage() {
  const section1 = [
    {
      title: "프로필 수정",
      icon: (
        <img
          src={personIcon}
          alt="프로필 수정"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "공개설정",
      icon: (
        <img
          src={VectorIcon}
          alt="공개설정"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "생활비 설정",
      icon: (
        <img
          src={LifeIcon}
          alt="생활비 설정"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "알림 설정",
      icon: (
        <img
          src={alamIcon}
          alt="알림 설정"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "구독 관리",
      icon: (
        <img
          src={cashIcon}
          alt="구독 관리"
          className="w-5 h-5 object-contain"
        />
      ),
    },
  ];

  const section2 = [
    {
      title: "고객센터",
      icon: (
        <img src={bookIcon} alt="고객센터" className="w-5 h-5 object-contain" />
      ),
    },
    {
      title: "이용 약관",
      icon: (
        <img
          src={checkIcon}
          alt="이용 약관"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "개인정보 처리방침",
      icon: (
        <img
          src={lockIcon}
          alt="개인정보 처리방침"
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      title: "회사 세부정보",
      icon: (
        <img
          src={contactIcon}
          alt="회사 세부정보"
          className="w-5 h-5 object-contain"
        />
      ),
    },
  ];

  const rowClass =
    "w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors";

  function Row({ title, icon }) {
    return (
      <>
        <div className="flex items-center gap-4">
          <div className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 text-sm">
            {icon}
          </div>
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
    <div className="w-full max-w-[430px] bg-white mx-auto relative border-x border-gray-100 overflow-hidden pb-20">
      <header className="px-5 pt-12 pb-5 flex items-end justify-between border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warn text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
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
          {section1.map((item, idx) =>
            item.title === "생활비 설정" ? (
              <Link key={idx} to="/plan" className={rowClass}>
                <Row title={item.title} icon={item.icon} />
              </Link>
            ) : (
              <button key={idx} className={rowClass}>
                <Row title={item.title} icon={item.icon} />
              </button>
            ),
          )}
        </div>

        <div className="h-px bg-[#f0f0f0] mx-5" />

        <div className="py-2">
          {section2.map((item, idx) => (
            <button key={idx} className={rowClass}>
              <Row title={item.title} icon={item.icon} />
            </button>
          ))}
        </div>

        <div className="h-px bg-[#f0f0f0] mx-5" />

        <div className="py-2 flex flex-col">
          <button className={rowClass}>
            <Row
              title="로그아웃"
              icon={
                <img
                  src={logoutIcon}
                  alt="로그아웃"
                  className="w-5 h-5 object-contain"
                />
              }
            />
          </button>
          <button className={rowClass}>
            <Row
              title="회원탈퇴"
              icon={
                <img
                  src={smileIcon}
                  alt="회원탈퇴"
                  className="w-5 h-5 object-contain"
                />
              }
            />
          </button>
        </div>
      </main>
    </div>
  );
}
