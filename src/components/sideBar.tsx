import { Button } from "@material-tailwind/react";
import { Children, ReactElement } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { IoMdPin } from "react-icons/io";
import { CityList } from "./cityList";
import { LoadingBar } from "./loadingBar";
import { SearchBar } from "./searchBar";
import clouds from "../assets/Cloud-background.png";
import { CelsiusTo } from "../util/converter";
import { format } from "date-fns";
import _ from "lodash";

export function SideBar({
  searchBarEnabled,
  setSearchBarEnabled,
  geolocation,
  setdefaultLocation,
  setCityName,
  geoCityName,
  loadingWeather,
  weatherConditions,
  weatherData,
  degresOption,
  cityName,
  loadingCities,
  possibleCities,
  onSearchBarValueChange,
  onSelectCityCB,
}: {
  searchBarEnabled: boolean;
  setSearchBarEnabled: (active: boolean) => void;
  geolocation: { latitude: number; longitude: number };
  setdefaultLocation: (value: any) => void;
  setCityName: (value: string) => void;
  geoCityName: string;
  loadingWeather: boolean;
  weatherConditions: Map<number, { image: string; name: string }>;
  weatherData: any;
  degresOption: "C" | "F";
  cityName: string;
  loadingCities: boolean;
  possibleCities: any;
  onSearchBarValueChange: (query: string) => void;
  onSelectCityCB: (latitude: number, longitude: number, city: string) => void;
}) {
  return (
    <>
      <div
        id="SideBarFake"
        className="bg-[#1E213A] w-1/3 h-[100%] overflow-hidden  "
      ></div>
      <div
        id="SideBar"
        className={`md:w-1/3 md:fixed bg-[#1E213A] w-[100%] h-screen overflow-hidden z-0 transition-all duration-1000 ${
          searchBarEnabled ? " " : ""
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
          <div id="weatherNowImage" className="mt-20 overflow-hidden relative ">
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
        className={`md:w-1/3 md:fixed absolute bg-[#1E213A] w-[100%] h-screen overflow-hidden ${
          searchBarEnabled
            ? "md:left-0 max-md:top-0 "
            : "md:-left-[110rem] max-md:-top-[110rem] "
        } transition-all duration-500 `}
      >
        <div className="mx-12">
          <div
            className={`ml-14 flex  flex-row-reverse mt-5 mb-11 z-0${
              searchBarEnabled ? "disabled" : ""
            }`}
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
                  onSelectCityCB(latitude, longitude, city);
                  setSearchBarEnabled(false);
                }}
                city={x.city}
              ></CityList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
