import { format, isTomorrow } from "date-fns";

export function DailyCard({
  date,
  image,
  minTemperature,
  maxTemperature,
  type,
}: {
  date: string;
  image: any;
  minTemperature: number;
  maxTemperature: number;
  type: "C" | "F";
}) {
  const dateTime = new Date(date ?? 0);
  const dateString = isTomorrow(dateTime)
    ? "Tomorrow"
    : `${format(dateTime, "EEE")}, ${dateTime.getDate()} ${format(
        dateTime,
        "MMM"
      )}`;

  return (
    <div
      id="small-card"
      className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base "
    >
      <div className="mx-auto mt-4">
        <span>{dateString}</span>
      </div>
      <img src={image} className="mt-3 w-14 mx-auto h-14"></img>
      <div className="felx flex-col mx-auto mt-8 mb-4">
        <span>
          {Math.round(maxTemperature)}°{type}
        </span>
        <span className="text-[#A09FB1] ml-4">
          {Math.round(minTemperature)}°{type}
        </span>
      </div>
    </div>
  );
}
