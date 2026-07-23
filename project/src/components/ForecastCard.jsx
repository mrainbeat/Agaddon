import Character from "./Character.jsx";

function ForecastCard({ message }) {
  return (
    <div className="flex flex-col items-center gap-0">
      <div className="relative max-w-[300px] rounded-2xl bg-[#FFE3CC] px-[17px] py-3 text-center after:absolute after:-bottom-2 after:left-1/2 after:border-8 after:border-transparent after:border-b-0 after:border-t-[#FFE3CC] after:content-[''] after:[transform:translateX(-50%)]">
        <p className="text-[18px] font-semibold leading-normal tracking-[-0.18px] text-[#6B493D] break-keep">
          {message}
        </p>
      </div>
      <div className="-mt-2 -mb-[69px]">
        <Character size={160} imgScale={1.6} verticalAnchor={68} />
      </div>
    </div>
  );
}

export default ForecastCard;
