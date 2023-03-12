import { RiArrowDownCircleFill } from "react-icons/ri";

const windDirection = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function WindDirection({ value }: { value: number }) {
  const direction = Math.round(value / 45) >= 8 ? 0 : Math.round(value / 45);

  return (
    <div className="flex mx-auto mt-8 mb-9">
      <RiArrowDownCircleFill
        className="m-auto h-8 w-8 text-[#FFFFFF4D] "
        style={{ rotate: `${180 + value}deg` }}
      />
      <span className="text-sm font-medium inline-block mt-2 ml-1">
        {windDirection[direction]}
      </span>
    </div>
  );
}
