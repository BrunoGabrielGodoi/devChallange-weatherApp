import { PercentageBar } from "./percentageBar";
import { StatsCard } from "./statsCard";
import { WindDirection } from "./windDirection";

export function StatusCardGrid({
  loadingWeather,
  weatherData,
}: {
  loadingWeather: boolean;
  weatherData: any;
}) {
  return (
    <div
      id="cardsGrid"
      className="xl:grid-cols-2 mt-8 grid-flow-row grid-cols-1 gap-12 grid mx-auto"
    >
      <StatsCard
        title="Wind status"
        value={weatherData?.hourly?.windspeed_10m[new Date().getHours()]}
        valueType={weatherData?.hourly_units?.windspeed_10m}
        size="large"
        isLoading={loadingWeather}
      >
        <WindDirection
          value={weatherData?.hourly?.winddirection_10m[new Date().getHours()]}
        ></WindDirection>
      </StatsCard>

      <StatsCard
        title="Humidity"
        value={weatherData?.hourly?.relativehumidity_2m[new Date().getHours()]}
        valueType={weatherData?.hourly_units?.relativehumidity_2m}
        size="large"
        isLoading={loadingWeather}
      >
        <PercentageBar
          value={
            weatherData?.hourly?.relativehumidity_2m[new Date().getHours()]
          }
        ></PercentageBar>
      </StatsCard>

      <StatsCard
        title="Visibility"
        value={weatherData?.hourly?.visibility[new Date().getHours()]}
        valueType={weatherData?.hourly_units?.visibility}
        isLoading={loadingWeather}
      ></StatsCard>

      <StatsCard
        title="Air Pressure"
        value={weatherData?.hourly?.surface_pressure[new Date().getHours()]}
        valueType={weatherData?.hourly_units?.surface_pressure}
        isLoading={loadingWeather}
      ></StatsCard>
    </div>
  );
}
