import axios from "axios";
import { useQuery } from "react-query";

export function GetCoordenates({ cityName }: { cityName: string }) {
  console.log("Inside get GetCoordenates", cityName);
  const { isLoading, error, data } = useQuery(
    ["get-coordinates", cityName],
    async ({ queryKey }) => {
      console.log("Inside queryKey", queryKey);

      const obj = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: { namePrefix: cityName, limit: "5" },
          headers: {
            "X-RapidAPI-Key":
              "f7ab36e3c0msh9c8219d0d7da18cp1b0323jsnd9e6c986dc3b",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      return obj.data;
    }
  );
  useQuery(["get-coordinates", cityName]);

  return data?.data;
}
