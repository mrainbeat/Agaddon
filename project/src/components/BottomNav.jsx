import { NavLink } from "react-router-dom";
import homeColor from "../assets/home_color.png";
import homeGray from "../assets/home_gray.png";
import friendColor from "../assets/friend_color.png";
import friendGray from "../assets/friend_gray.png";
import recordColor from "../assets/record_color.png";
import recordGray from "../assets/record_gray.png";
import myColor from "../assets/my_color.png";
import myGray from "../assets/my_gray.png";

const TABS = [
  { to: "/home", label: "홈", color: homeColor, gray: homeGray },
  { to: "/friends", label: "친구", color: friendColor, gray: friendGray },
  { to: "/records", label: "기록", color: recordColor, gray: recordGray },
  { to: "/my", label: "마이", color: myColor, gray: myGray },
];

function BottomNav() {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 flex border-t border-line-soft bg-surface px-[46px] pb-[calc(8px+env(safe-area-inset-bottom,0px))] pt-3"
      aria-label="주요 메뉴"
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold no-underline ${
              isActive ? "text-warn" : "text-ink-muted"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? tab.color : tab.gray}
                alt=""
                width={22}
                height={22}
                aria-hidden="true"
              />
              <span>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
