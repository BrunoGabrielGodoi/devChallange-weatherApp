import axios from "axios";
import { useQuery } from "react-query";

export function GetWeather(latitude: number, longitude: number) {
  const { isLoading, error, data } = useQuery(
    ["get-weather", latitude, longitude],
    async () => {
      const obj = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=-23.60&longitude=-46.64&hourly=temperature_2m,relativehumidity_2m,surface_pressure,visibility,windspeed_10m,winddirection_10m&daily=weathercode,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo"
      );
      return obj.data;
    }
  );
  useQuery(["get-weather", latitude, longitude]);
  return data;
}
