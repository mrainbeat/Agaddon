import Character from "./Character.jsx";
import {
  formatWon,
  SURVIVAL_ITEM_LABEL,
  SURVIVAL_DAILY_AMOUNT,
} from "../lib/store.js";

function buildForecastMessage({ nextSub, budget }) {
  const { spentAmount, maxAmount, daysLeft } = budget;
  const remaining = maxAmount - spentAmount;
  const ratio = maxAmount > 0 ? spentAmount / maxAmount : 0;
  const safeDays = Math.max(daysLeft, 1);

  if (nextSub && nextSub.daysLeft <= 0) {
    return `오늘 <strong class="text-[#FF795B]">${nextSub.name} (${formatWon(nextSub.amount)})</strong> 결제일이야!`;
  }

  if (remaining <= 0) {
    return `이번 플랜 예산을 이미 다 썼어... 남은 기간엔 정말 최소한으로만 쓰자ㅠ`;
  }

  if (ratio >= 0.7) {
    const cushion = remaining - safeDays * SURVIVAL_DAILY_AMOUNT;
    if (cushion > 0) {
      return `<strong class="text-[#FF795B]">${formatWon(cushion)}</strong> 더 쓰면 하루를 <strong class="text-[#FF795B]">${SURVIVAL_ITEM_LABEL}</strong>로 버텨야 해ㅜ`;
    }
    return `지금부터는 하루 <strong class="text-[#FF795B]">${SURVIVAL_ITEM_LABEL}(${formatWon(SURVIVAL_DAILY_AMOUNT)})</strong> 수준으로만 버틸 수 있어... 오늘은 진짜 아껴줘ㅠㅠ`;
  }

  if (nextSub && nextSub.daysLeft <= 3) {
    return `${nextSub.daysLeft}일 뒤에 <strong class="text-[#FF795B]">${nextSub.name} (${formatWon(nextSub.amount)})</strong> 결제가 있어!`;
  }

  return "다가오는 정기결제가 없어! 이번 달은 든든하네 🙌";
}

function ForecastCard({ nextSub, budget }) {
  return (
    <div className="flex flex-col items-center gap-0">
      <div className="relative max-w-[300px] rounded-2xl bg-[#FFE3CC] px-[17px] py-3 text-center after:absolute after:-bottom-2 after:left-1/2 after:border-8 after:border-transparent after:border-b-0 after:border-t-[#FFE3CC] after:content-[''] after:[transform:translateX(-50%)]">
        <p
          className="text-[22px] font-bold leading-[140%] tracking-[-0.22px] text-[#6B493D]"
          dangerouslySetInnerHTML={{
            __html: buildForecastMessage({ nextSub, budget }),
          }}
        />
      </div>
      <div className="-mt-2 -mb-[69px]">
        <Character size={160} imgScale={1.6} verticalAnchor={68} />
      </div>
    </div>
  );
}

export default ForecastCard;
