import { formatWon } from "../lib/store.js";

function SpendingBar({ spentAmount, maxAmount, onAddClick }) {
  const ratio = maxAmount > 0 ? Math.min(spentAmount / maxAmount, 1) : 0;
  const percent = Math.round(ratio * 100);
  const isOver = spentAmount > maxAmount;
  const remaining = maxAmount - spentAmount;

  return (
    <section className="flex flex-col gap-5" aria-label="소비 내역">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[20px] font-semibold tracking-[-0.2px] text-[#2B2928]">
          소비 내역
        </h2>
        {onAddClick ? (
          <button
            type="button"
            className="rounded-full bg-warn px-3.5 py-1 text-[13px] font-bold text-white"
            onClick={onAddClick}
          >
            입력
          </button>
        ) : (
          <span
            className={`text-[13px] font-bold ${isOver ? "text-danger" : "text-ink-muted"}`}
          >
            {percent}%
          </span>
        )}
      </div>

      <div
        className="h-[26px] overflow-hidden rounded-full bg-line-soft"
        role="progressbar"
        aria-valuenow={spentAmount}
        aria-valuemin={0}
        aria-valuemax={maxAmount}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-400 ease-in-out ${
            isOver ? "bg-danger" : "bg-[#FF795B]"
          }`}
          style={{ width: `${Math.max(percent, 4)}%` }}
        />
      </div>

      <div className="flex justify-between text-[13px] font-semibold">
        <span>{formatWon(spentAmount)} 사용</span>
        <span className="font-medium text-ink-muted">
          {formatWon(remaining)} 남음
        </span>
      </div>
    </section>
  );
}

export default SpendingBar;
