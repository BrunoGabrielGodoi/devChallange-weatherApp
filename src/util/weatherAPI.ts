import axios from "axios";
import { useQuery } from "react-query";

export function GetWeather({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  console.log("Inside get Weather", latitude, longitude);
  const { isLoading, error, data } = useQuery(
    ["get-weather", latitude, longitude],
    async ({ queryKey }) => {
      console.log("Inside queryKey", queryKey);

      const obj = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          queryKey[1] ?? 0
        }&longitude=${
          queryKey[2] ?? 0
        }&hourly=temperature_2m,relativehumidity_2m,surface_pressure,visibility,windspeed_10m,winddirection_10m&daily=weathercode,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo`
      );
      return obj.data;
    }
  );
  return useQuery<unknown, unknown, any>(["get-weather", latitude, longitude]);
}
