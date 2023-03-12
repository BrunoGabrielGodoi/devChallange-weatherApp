import React from "react";
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
import { SearchBar } from "./components/searchBar";
import { useState, useRef, Component } from "react";
import { GetWeather } from "./util/weatherAPI";
import { DailyCard } from "./components/dailyCard";
import { StatsCard } from "./components/statsCard";
import { PercentageBar } from "./components/percentageBar";
import { WindDirection } from "./components/windDirection";
import { format } from "date-fns";

function App() {
  const [inputValue, setInputValue] = useState("");
  const data = GetWeather(1, 1);
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
  console.log(data);

  return (
    <div className="bg-[#1E213A] flex flex-row mx-auto max-w-[120rem] max-h-screen font-[raleway]  text-[#E7E7EB] text-xs ">
      <div id="SideBar" className="bg-[#1E213A] w-1/3 h-screen overflow-hidden">
        <div className="mt-11 ml-12 mr-12 flex flex-row justify-between">
          <Button
            type="submit"
            className="bg-[#6E707A]   justify-center h-10 w-40"
          >
            <p className="m-auto ml-0 text-[16px] text-[white]">
              Search for places
            </p>
          </Button>
          <Button
            type="submit"
            className="bg-[#6E707A]  justify-center rounded-full h-10 w-10"
          >
            <BiCurrentLocation className="m-auto h-5 w-5 text-[white]" />
          </Button>
        </div>
        <div id="weatherNowImage" className="mt-28 overflow-hidden relative">
          <img
            src={clouds}
            className=" w-[100%] relative opacity-20 z-10"
          ></img>
          <img
            src={
              weatherConditions.get(data?.daily?.weathercode[0] ?? 0)?.image ??
              ""
            }
            className="top-1/2 left-1/2 -mt-[101px] -ml-[101px] w-[202px] absolute z-20"
          ></img>
        </div>
        <div className="mt-28 font-medium flex ">
          <span className="text-[144px] mx-auto text-[#E7E7EB]">
            {Math.round(data?.hourly?.temperature_2m[new Date().getHours()])}
            <span className="text-[48px] text-[#A09FB1]">ºc</span>
          </span>
        </div>
        <div className="mt-28 text-center">
          <span className="text-[36px] text-[#A09FB1] font-semibold">
            {weatherConditions.get(data?.daily?.weathercode[0] ?? 0)?.name ??
              ""}
          </span>
        </div>
        <div className="mt-32 text-center">
          <span className="text-[18px] text-[#88869D] font-semibold">
            Today{" "}
            <span className="ml-4">
              •<span className="ml-4">{format(new Date(), "EEE, dd MMM")}</span>
            </span>
          </span>
        </div>
        <div className="mt-8 flex text-center">
          <div className="flex mx-auto text-[18px] text-[#88869D] font-semibold">
            <IoMdPin className="-mt-[2px]" />
            <span>Helsinki</span>
          </div>
        </div>
      </div>
      {/* <div
        id="Search-SideBar"
        className="bg-[#1E213A] w-1/3 h-screen overflow-hidden "
      >
        <div className="mx-12">
          <SearchBar />
          <div className="mt-14 text-base flex flex-col space-y-6">
            <div className="border border-[#616475] h-16 flex flex-row items-center p-3 justify-between">
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
            </div>
          </div>
        </div>
      </div> */}
      <div className="bg-[#100E1D] w-[71%] h-screen pr-32 flex flex-col">
        <div className="flex flex-row justify-end space-x-4 mt-11 ">
          <Button
            type="submit"
            className="bg-[#6E707A] justify-center rounded-full h-10 w-10"
          >
            ºc
          </Button>
          <Button
            type="submit"
            className="bg-[#6E707A]  justify-center rounded-full h-10 w-10"
          >
            ºF
          </Button>
        </div>
        <div
          id="cardsList"
          className="mt-16 ml-40  xl:space-x-6 xl:flex xl:flex-row lg:grid-cols-3 grid-cols-2 grid gap-3"
        >
          {a.map((a, index) => {
            if (index < 6 && index != 0)
              return (
                <DailyCard
                  date={data?.daily.time[a]}
                  image={
                    weatherConditions.get(data?.daily?.weathercode[a] ?? 0)
                      ?.image ?? ""
                  }
                  maxTemperature={data?.daily?.apparent_temperature_max[a] ?? 0}
                  minTemperature={data?.daily?.apparent_temperature_min[a] ?? 0}
                  type="C"
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
              value={data?.hourly?.windspeed_10m[new Date().getHours()]}
              valueType={data?.hourly_units?.windspeed_10m}
              size="large"
            >
              <WindDirection
                value={data?.hourly?.winddirection_10m[new Date().getHours()]}
              ></WindDirection>
            </StatsCard>

            <StatsCard
              title="Humidity"
              value={data?.hourly?.relativehumidity_2m[new Date().getHours()]}
              valueType={data?.hourly_units?.relativehumidity_2m}
              size="large"
            >
              <PercentageBar
                value={data?.hourly?.relativehumidity_2m[new Date().getHours()]}
              ></PercentageBar>
            </StatsCard>

            <StatsCard
              title="Visibility"
              value={data?.hourly?.visibility[new Date().getHours()]}
              valueType={data?.hourly_units?.visibility}
            ></StatsCard>

            <StatsCard
              title="Air Pressure"
              value={data?.hourly?.surface_pressure[new Date().getHours()]}
              valueType={data?.hourly_units?.surface_pressure}
            ></StatsCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
