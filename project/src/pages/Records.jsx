import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/arrow.svg";

// 아이콘 임포트 (.png)
import cupangIcon from "../assets/cupang.png";
import musinsaIcon from "../assets/musinsa.png";
import fastfoodIcon from "../assets/fastfood.svg";
import gptIcon from "../assets/gpt.png";
import kakaotalkIcon from "../assets/kakaotalk.png";
import carIcon from "../assets/car.svg";

export default function Record() {
  const [historyData, setHistoryData] = useState([
    {
      date: "23일 목요일",
      items: [
        {
          id: 1,
          title: "쿠팡",
          amount: "-6,890원",
          icon: cupangIcon,
          hasBg: false,
        },
        {
          id: 2,
          title: "무신사",
          amount: "-99,890원",
          icon: musinsaIcon,
          hasBg: false,
        },
        {
          id: 3,
          title: "식비",
          amount: "-9,000원",
          icon: fastfoodIcon,
          hasBg: true,
        },
      ],
    },
    {
      date: "22일 수요일",
      items: [
        {
          id: 4,
          title: "GPT Plus",
          amount: "-36,890원",
          icon: gptIcon,
          hasBg: false,
        },
        {
          id: 5,
          title: "식비",
          amount: "-12,000원",
          icon: fastfoodIcon,
          hasBg: true,
        },
      ],
    },
    {
      date: "21일 화요일",
      items: [
        {
          id: 6,
          title: "쿠팡",
          amount: "-24,700원",
          icon: cupangIcon,
          hasBg: false,
        },
        {
          id: 7,
          title: "쿠팡",
          amount: "-3,280원",
          icon: cupangIcon,
          hasBg: false,
        },
        {
          id: 8,
          title: "식비",
          amount: "-9,000원",
          icon: carIcon,
          hasBg: true,
        },
        {
          id: 9,
          title: "카카오톡 선물하기",
          amount: "-24,000원",
          icon: kakaotalkIcon,
          hasBg: false,
        },
      ],
    },
  ]);

  const handleDelete = (dateIndex, itemId) => {
    const updated = historyData
      .map((group, idx) => {
        if (idx === dateIndex) {
          return {
            ...group,
            items: group.items.filter((item) => item.id !== itemId),
          };
        }
        return group;
      })
      .filter((group) => group.items.length > 0);

    setHistoryData(updated);
  };

  return (
    <div className="w-full max-w-[430px] bg-white mx-auto relative border-x border-gray-100 overflow-hidden pb-20">
      {/* 상단 헤더 */}
      <header className="px-5 pt-5 pb-4 flex flex-col gap-3 border-b border-[#B4B4B4] sticky top-0 bg-white z-10">
        <Link to="/home" className="w-fit hover:opacity-70 transition-opacity">
          <img
            src={arrowIcon}
            alt="뒤로가기"
            className="w-10 h-10 object-contain"
          />
        </Link>
        <h1 className="text-[22px] font-bold text-black tracking-tight">
          소비 기록
        </h1>
      </header>

      {/* 메인 리스트 영역 */}
      <main className="flex flex-col px-5 pt-4">
        {historyData.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h2 className="text-[14px] font-semibold text-[#8b899a] mb-3">
              {group.date}
            </h2>

            <div className="flex flex-col gap-4">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* 정사각형 박스 형태로 변경 (rounded-full 제거 및 rounded-lg 등 필요시 조절 가능) */}
                    <div
                      className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 overflow-hidden ${
                        item.hasBg ? "bg-[#FF795B]" : ""
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt={item.title}
                        className={`object-contain ${item.hasBg ? "w-6 h-6" : "w-full h-full"}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#1c1b22]">
                        {item.amount}
                      </span>
                      <span className="text-[13px] text-[#8b899a]">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(groupIndex, item.id)}
                    className="text-[#8b899a] hover:text-red-500 p-2 transition-colors"
                    aria-label="삭제"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
