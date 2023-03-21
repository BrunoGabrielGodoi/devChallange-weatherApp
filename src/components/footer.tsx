import { format, isTomorrow } from "date-fns";
import { CelsiusTo } from "../util/converter";
import { DailyCard } from "./dailyCard";

export function Footer({}: {}) {
  return (
    <div className="flex flex-row md:ml-40 ">
      <span
        onClick={() =>
          window.open(
            "https://github.com/BrunoGabrielGodoi/devChallange-weatherApp",
            "_blank",
            "noopener,noreferrer"
          )
        }
        className="text-[#A09FB1] cursor-pointer mx-auto mt-8 mb-4 text-sm font-['montserrat'] "
      >
        created by <u>Bruno</u> - devChallenges.io
      </span>
    </div>
  );
}
