import { format, isTomorrow } from "date-fns";
import { CelsiusTo } from "../util/converter";
import { DailyCard } from "./dailyCard";

export function DailyCardList({
  loadingWeather,
  degresOption,
  weatherData,
  weatherConditions,
}: {
  loadingWeather: boolean;
  degresOption: "C" | "F";
  weatherData: any;
  weatherConditions: Map<number, { image: string; name: string }>;
}) {
  const daysToUse = [1, 2, 3, 4, 5, 6];

  return (
    <div
      id="cardsList"
      className="2xl:space-x-14 2xl:flex 2xl:flex-row 
                xl:grid-cols-4  
                lg:grid-cols-3 
                md:ml-40 
                grid-cols-2 grid gap-3 mt-16 mx-auto "
    >
      {daysToUse.map((a, index) => {
        if (index < 6 && index != 0)
          return (
            <DailyCard
              date={weatherData?.daily?.time[a]}
              image={
                weatherConditions.get(weatherData?.daily?.weathercode[a] ?? 0)
                  ?.image ?? ""
              }
              maxTemperature={CelsiusTo({
                value: weatherData?.daily?.apparent_temperature_max[a] ?? 0,
                unit: degresOption,
              })}
              minTemperature={CelsiusTo({
                value: weatherData?.daily?.apparent_temperature_min[a] ?? 0,
                unit: degresOption,
              })}
              type={degresOption}
              isLoading={loadingWeather}
            ></DailyCard>
          );
      })}
    </div>
  );
}
