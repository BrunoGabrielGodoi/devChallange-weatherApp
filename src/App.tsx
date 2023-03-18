import React, { useEffect } from "react";
import logo from "./logo.svg";
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
import clouds from "./assets/Cloud-background.png";
import { Button } from "@material-tailwind/react";
import { BiCurrentLocation } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import { RiArrowDownCircleFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { SearchBar } from "./components/searchBar";
import { useState, useRef, Component } from "react";
import { GetWeather } from "./util/weatherAPI";
import { DailyCard } from "./components/dailyCard";
import { StatsCard } from "./components/statsCard";
import { PercentageBar } from "./components/percentageBar";
import { WindDirection } from "./components/windDirection";
import { format } from "date-fns";
import { CelsiusTo } from "./util/converter";
import useGeolocation from "react-hook-geolocation";
import { getLogger } from "react-query/types/core/logger";
import { GetCity, GetCoordenates } from "./util/cityAPI";
import { CityList } from "./components/cityList";
import _ from "lodash";
import { LoadingBar } from "./components/loadingBar";

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

  const a = [1, 2, 3, 4, 5, 6];

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
      <div
        id="SideBarFake"
        className="bg-[#1E213A] w-1/3 h-[100%] overflow-hidden  "
      ></div>
      <div
        id="SideBar"
        className={`md:w-1/3 md:fixed bg-[#1E213A] w-[100%] h-screen overflow-hidden   ${
          searchBarEnabled ? "hidden" : ""
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="mt-11 ml-12 mr-12 flex flex-row justify-between">
            <Button
              type="submit"
              className="bg-[#6E707A] justify-center h-10 w-40"
              onClick={() => setSearchBarEnabled(true)}
            >
              <p className="m-auto ml-0 text-[16px] text-[white]">
                Search for places
              </p>
            </Button>
            <Button
              type="submit"
              className="bg-[#6E707A]  justify-center rounded-full h-10 w-10"
              onClick={() => {
                console.log("button pressed");
                setdefaultLocation(() => geolocation);
                setCityName(geoCityName);
              }}
            >
              <BiCurrentLocation className="m-auto h-5 w-5 text-[white]" />
            </Button>
          </div>
          <div id="weatherNowImage" className="mt-20 overflow-hidden relative">
            <img src={clouds} className=" w-[100%] relative opacity-20 z-10" />
            {loadingWeather ? (
              <div className="top-1/2 left-1/2 -mt-[101px] -ml-[101px] w-[202px] h-48 absolute z-20 rounded-full animate-pulse bg-[#4a4e6d]" />
            ) : (
              <img
                src={
                  weatherConditions.get(weatherData?.daily?.weathercode[0] ?? 0)
                    ?.image ?? ""
                }
                className={`top-1/2 left-1/2 -mt-[101px] -ml-[101px] w-[202px] absolute z-20`}
              ></img>
            )}
          </div>
          <div className="mt-28 font-medium flex ">
            <span
              className={`text-[144px] mx-auto text-[#E7E7EB]  ${
                loadingWeather ? "bg-[#4a4e6d] animate-pulse h-40 w-40" : ""
              }`}
            >
              {!loadingWeather
                ? Math.round(
                    CelsiusTo({
                      value:
                        weatherData?.hourly?.temperature_2m[
                          new Date().getHours()
                        ],
                      unit: degresOption,
                    })
                  )
                : ""}
              <span className="text-[48px] text-[#A09FB1]">
                {!loadingWeather ? `º${degresOption}` : ""}
              </span>
            </span>
          </div>
          <div className="mt-28 text-center">
            <span className="text-[36px] text-[#A09FB1] font-semibold">
              {!loadingWeather
                ? weatherConditions.get(weatherData?.daily?.weathercode[0] ?? 0)
                    ?.name ?? ""
                : ""}
            </span>
          </div>
          <div className="md:mt-20 mt-10 text-center">
            <span className="text-[18px] text-[#88869D] font-semibold">
              Today{" "}
              <span className="ml-4">
                •
                <span className="ml-4">
                  {format(new Date(), "EEE, dd MMM")}
                </span>
              </span>
            </span>
          </div>
          <div className="mt-8 flex text-center">
            <div className="flex mx-auto text-[18px] text-[#88869D] font-semibold">
              <IoMdPin className="-mt-[2px]" />
              <span>{cityName}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Search-SideBar"
        className={`bg-[#1E213A] w-1/3 h-screen overflow-hidden fixed ${
          searchBarEnabled ? "" : "hidden"
        }`}
      >
        <div className="mx-12">
          <div
            className="ml-14 flex  flex-row-reverse mt-5 mb-11 "
            onClick={() => setSearchBarEnabled(false)}
          >
            <CgClose className="h-6 w-6 cursor-pointer"></CgClose>
          </div>
          <SearchBar
            onValueChangeCB={_.debounce(onSearchBarValueChange, 1000)}
            onSubmitCB={onSearchBarValueChange}
          />
          <div className="mt-14 text-base flex flex-col space-y-6">
            <LoadingBar active={loadingCities} />
            {(possibleCities as any)?.data?.map((x: any, index: number) => (
              <CityList
                cityName={x.city}
                cityState={x.countryCode}
                key={index}
                latitude={x.latitude}
                longitude={x.longitude}
                onClickCB={(
                  latitude: number,
                  longitude: number,
                  city: string
                ) => {
                  onSelectCity(latitude, longitude, city);
                  setSearchBarEnabled(false);
                }}
                city={x.city}
              ></CityList>
            ))}
            {/* <div className="border border-[#616475] h-16 flex flex-row items-center p-3 justify-between">
              <span className="font-medium ">London</span>
              <span className="font-medium text-[#616475]">{">"}</span>
            </div>
            <div className=" h-16 flex flex-row items-center p-3 justify-between">
              <span className="font-medium ">Bragança Paulista</span>
              <span className="font-medium text-[#616475]">{">"}</span>
            </div>
            <div className=" h-16 flex flex-row items-center p-3 justify-between">
              <span className="font-medium ">Chuvitiba</span>
              <span className="font-medium text-[#616475]">{">"}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="md:w-[71%] bg-[#100E1D] w-full h-max h- pr-32 flex flex-col">
        <div className="flex flex-row justify-end space-x-4 mt-11 ">
          <Button
            type="submit"
            className={`${
              degresOption == "C"
                ? "bg-[#e0e0e6] text-[#000]"
                : "bg-[#6E707A] text-[#fff] "
            }  justify-center rounded-full h-10 w-10`}
            onClick={() => setDegresOption("C")}
          >
            ºC
          </Button>
          <Button
            type="submit"
            className={`${
              degresOption == "F"
                ? "bg-[#e0e0e6] text-[#000]"
                : "bg-[#6E707A] text-[#fff] "
            }  justify-center rounded-full h-10 w-10`}
            onClick={() => setDegresOption("F")}
          >
            ºF
          </Button>
        </div>
        <div
          id="cardsList"
          className="2xl:space-x-14 2xl:flex 2xl:flex-row 
                      xl:grid-cols-4  
                      lg:grid-cols-3 
                      grid-cols-2 grid gap-3 mt-16 ml-40 "
        >
          {a.map((a, index) => {
            if (index < 6 && index != 0)
              return (
                <DailyCard
                  date={weatherData?.daily?.time[a]}
                  image={
                    weatherConditions.get(
                      weatherData?.daily?.weathercode[a] ?? 0
                    )?.image ?? ""
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
        <div id="highlights" className="mt-20 ml-40 ">
          <div>
            <span className="font-bold text-2xl">Today’s Hightlights</span>
          </div>
          <div
            id="cardsGrid"
            className="mt-8  grid-flow-row	grid-cols-1 xl:grid-cols-2  gap-12 grid"
          >
            <StatsCard
              title="Wind status"
              value={weatherData?.hourly?.windspeed_10m[new Date().getHours()]}
              valueType={weatherData?.hourly_units?.windspeed_10m}
              size="large"
              isLoading={loadingWeather}
            >
              <WindDirection
                value={
                  weatherData?.hourly?.winddirection_10m[new Date().getHours()]
                }
              ></WindDirection>
            </StatsCard>

            <StatsCard
              title="Humidity"
              value={
                weatherData?.hourly?.relativehumidity_2m[new Date().getHours()]
              }
              valueType={weatherData?.hourly_units?.relativehumidity_2m}
              size="large"
              isLoading={loadingWeather}
            >
              <PercentageBar
                value={
                  weatherData?.hourly?.relativehumidity_2m[
                    new Date().getHours()
                  ]
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
              value={
                weatherData?.hourly?.surface_pressure[new Date().getHours()]
              }
              valueType={weatherData?.hourly_units?.surface_pressure}
              isLoading={loadingWeather}
            ></StatsCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
