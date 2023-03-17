import axios from "axios";
import { useQuery } from "react-query";

export function GetCoordenates({ cityName }: { cityName: string }) {
  console.log("Inside get GetCoordenates", cityName);
  const { isLoading, error, data } = useQuery(
    ["get-coordinates", cityName],
    async ({ queryKey }) => {
      let response;
      if (cityName.length > 0) {
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

        response = obj.data;
      }
      return response;
    },
    { cacheTime: 100000 }
  );

  return useQuery(["get-coordinates", cityName]);

  //  data?.data;
}

export function GetCity({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  console.log("Inside get GetCoordenates", latitude, longitude);
  const { isLoading, error, data } = useQuery(
    ["get-coordinates", latitude, longitude],
    async ({ queryKey }) => {
      console.log("Inside queryKey", queryKey);

      const obj = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: {
            location: `${queryKey[1] >= 0 ? "+" : ""}${queryKey[1]}${
              queryKey[2] >= 0 ? "+" : ""
            }${queryKey[2]}`,
            types: "CITY",
            limit: "1",
          },
          headers: {
            "X-RapidAPI-Key":
              "f7ab36e3c0msh9c8219d0d7da18cp1b0323jsnd9e6c986dc3b",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      return obj.data;
    },
    { cacheTime: 100000 }
  );
  useQuery(["get-coordinates", latitude, longitude]);

  console.log(data?.data);
  return data?.data[0];
}
