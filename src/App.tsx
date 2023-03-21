import { useEffect } from "react";
import "./App.css";
import shower from "./assets/Shower.png";
import clear from "./assets/Clear.png";
import hail from "./assets/Hail.png";
import heavyCloud from "./assets/HeavyCloud.png";
import heavyRain from "./assets/HeavyRain.png";
import lightCloud from "./assets/LightCloud.png";
import lightRain from "./assets/LightRain.png";
import sleet from "./assets/Sleet.png";
import snow from "./assets/Snow.png";
import thunderstorm from "./assets/Thunderstorm.png";
import { useState } from "react";
import { GetWeather } from "./util/weatherAPI";
import useGeolocation from "react-hook-geolocation";
import { GetCity, GetCoordenates } from "./util/cityAPI";
import _ from "lodash";
import { SideBar } from "./components/sideBar";
import { UnitOption } from "./components/unitOption";
import { DailyCardList } from "./components/dailyCardList";
import { StatusCardGrid as StatusCardGrid } from "./components/statusCardGrid";
import { Footer } from "./components/footer";

function App() {
  const geolocation: { latitude: number; longitude: number } = useGeolocation();
  const geoCityName = GetCity(geolocation)?.city ?? "";
  const [defaultLocation, setdefaultLocation] = useState(geolocation);
  useEffect(() => {
    setdefaultLocation(geolocation);
  }, [geolocation]);

  const [citySearch, setcitySearch] = useState("");
  const [searchBarEnabled, setSearchBarEnabled] = useState(false);

  let { data: possibleCities, isLoading: loadingCities } = GetCoordenates({
    cityName: citySearch,
  });

  let { data: weatherData, isLoading: loadingWeather } = GetWeather({
    latitude: defaultLocation?.latitude ?? 0,
    longitude: defaultLocation?.longitude ?? 0,
  });

  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setCityName(geoCityName);
  }, [geoCityName]);

  const [degresOption, setDegresOption] = useState<"C" | "F">("C");
  const weatherConditions = new Map<number, { image: string; name: string }>([
    [0, { image: clear, name: "Clear" }],
    [1, { image: clear, name: "Clear" }],
    [2, { image: lightCloud, name: "LightCloud" }],
    [3, { image: lightCloud, name: "LightCloud" }],
    [45, { image: heavyCloud, name: "HeavyCloud" }],
    [48, { image: heavyCloud, name: "HeavyCloud" }],
    [51, { image: lightRain, name: "LightRain" }],
    [53, { image: lightRain, name: "LightRain" }],
    [55, { image: lightRain, name: "LightRain" }],
    [56, { image: sleet, name: "Sleet" }],
    [57, { image: sleet, name: "Sleet" }],
    [61, { image: heavyRain, name: "HeavyRain" }],
    [63, { image: heavyRain, name: "HeavyRain" }],
    [65, { image: heavyRain, name: "HeavyRain" }],
    [66, { image: hail, name: "Hail" }],
    [67, { image: hail, name: "Hail" }],
    [71, { image: snow, name: "Snow" }],
    [73, { image: snow, name: "Snow" }],
    [75, { image: snow, name: "Snow" }],
    [77, { image: snow, name: "Snow" }],
    [80, { image: shower, name: "Shower" }],
    [81, { image: shower, name: "Shower" }],
    [82, { image: shower, name: "Shower" }],
    [85, { image: snow, name: "Snow" }],
    [86, { image: snow, name: "Snow" }],
    [95, { image: thunderstorm, name: "Thunderstorm" }],
    [96, { image: thunderstorm, name: "Thunderstorm" }],
    [99, { image: thunderstorm, name: "Thunderstorm" }],
  ]);

  function onSearchBarValueChange(query: string) {
    setcitySearch(query);
  }

  function onSelectCity(latitude: number, longitude: number, cityName: string) {
    setdefaultLocation({ latitude, longitude });
    setCityName(cityName);
  }

  return (
    <div
      className="xl:h-screen 
                    md:flex-row 
                    flex flex-col  mx-auto max-w-[100%] max-h-[100%]  font-[raleway]  text-[#E7E7EB] text-xs bg-[#100E1D] "
    >
      <SideBar
        cityName={cityName}
        degresOption={degresOption}
        geoCityName={geoCityName}
        geolocation={geolocation}
        loadingCities={loadingCities}
        loadingWeather={loadingWeather}
        onSearchBarValueChange={onSearchBarValueChange}
        onSelectCityCB={onSelectCity}
        possibleCities={possibleCities}
        searchBarEnabled={searchBarEnabled}
        setCityName={setCityName}
        setSearchBarEnabled={setSearchBarEnabled}
        setdefaultLocation={setdefaultLocation}
        weatherConditions={weatherConditions}
        weatherData={weatherData}
      ></SideBar>
      <div className="md:w-[71%] bg-[#100E1D] w-full h-max  md:pr-32 flex flex-col">
        <UnitOption
          degresOption={degresOption}
          setDegresOption={setDegresOption}
        ></UnitOption>
        <DailyCardList
          degresOption={degresOption}
          loadingWeather={loadingWeather}
          weatherConditions={weatherConditions}
          weatherData={weatherData}
        ></DailyCardList>
        <div id="highlights" className="mt-[72px] md:ml-40 max-md:mx-auto">
          <div>
            <span className="font-bold text-2xl">Today’s Hightlights</span>
          </div>
          <StatusCardGrid
            loadingWeather={loadingWeather}
            weatherData={weatherData}
          ></StatusCardGrid>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
