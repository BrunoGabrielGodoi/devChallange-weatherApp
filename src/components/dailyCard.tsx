import { format, isTomorrow } from "date-fns";

export function DailyCard({
  date,
  image,
  minTemperature,
  maxTemperature,
  type,
  isLoading,
}: {
  date: string;
  image: any;
  minTemperature: number;
  maxTemperature: number;
  type: "C" | "F";
  isLoading: boolean;
}) {
  const dateTime = new Date(date ?? 0);
  const dateString = isTomorrow(dateTime)
    ? "Tomorrow"
    : `${format(dateTime, "EEE")}, ${dateTime.getDate()} ${format(
        dateTime,
        "MMM"
      )}`;

  return isLoading ? (
    <div
      id="small-card"
      className="bg-[#1E213A] animate-pulse w-32 h-44 flex flex-col justify-center font-medium text-base "
    >
      <div className="mx-auto mt-4 bg-[#4a4e6d] w-20 h-6">
        <span>{}</span>
      </div>
      <div className="mt-3 w-14 mx-auto h-14 rounded-full bg-[#4a4e6d]"></div>
      <div className="felx flex-col mx-auto mt-8 mb-4 w-20 bg-[#4a4e6d]">
        <span></span>
        <span className="text-[#A09FB1] ml-4 bg-[#4a4e6d] w-10"></span>
      </div>
    </div>
  ) : (
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
