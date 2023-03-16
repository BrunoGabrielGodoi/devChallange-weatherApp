import { Button } from "@material-tailwind/react";
import { Children, ReactElement } from "react";

export function CityList({
  cityName,
  key,
  cityState,
  latitude,
  longitude,
  onClickCB,
}: {
  cityName: string;
  cityState: string;
  key: number;
  latitude: number;
  longitude: number;
  onClickCB: (latitude: number, longitude: number) => void;
}) {
  return (
    <Button
      key={key}
      size="lg"
      variant="text"
      className={`hover:boder hover:border-[#616475] hover:shadow-pink-500/40 transition-all h-16 flex flex-row items-center p-3 justify-between  `}
      onClick={() => onClickCB(latitude, longitude)}
    >
      <span className="font-medium ">
        {cityName} - {cityState}
      </span>
      <span className="font-medium text-[#616475]">{">"}</span>
    </Button>
  );
}
