import React from "react";
import logo from "./logo.svg";
import "./App.css";
import shower from "./assets/Shower.png";
import clouds from "./assets/Cloud-background.png";
import { Button } from "@material-tailwind/react";
import { BiCurrentLocation } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import { RiArrowDownCircleFill } from "react-icons/ri";

function App() {
  return (
    <div className="flex flex-row mx-auto max-w-[90rem] max-h-screen font-[raleway]  text-[#E7E7EB] text-xs">
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
        <div id="weatherNowImage" className="mt-5 overflow-hidden relative">
          <img
            src={clouds}
            className=" w-[100%] relative opacity-20 z-10"
          ></img>
          <img
            src={shower}
            className="top-1/2 left-1/2 -mt-[101px] -ml-[101px] w-[202px] absolute z-20"
          ></img>
        </div>
        <div className="mt-8 font-medium flex ">
          <span className="text-[144px] mx-auto text-[#E7E7EB]">
            15
            <span className="text-[48px] text-[#A09FB1]">ºc</span>
          </span>
        </div>
        <div className="mt-20 text-center">
          <span className="text-[36px] text-[#A09FB1] font-semibold">
            Shower
          </span>
        </div>
        <div className="mt-20 text-center">
          <span className="text-[18px] text-[#88869D] font-semibold">
            Today{" "}
            <span className="ml-4">
              •<span className="ml-4">Fri, 5 Jun</span>
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
          <div
            id="small-card"
            className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base "
          >
            <div className="mx-auto mt-4">
              <span>Tomorrow</span>
            </div>
            <img src={shower} className="mt-3 w-[56px] mx-auto"></img>
            <div className="felx flex-col mx-auto mt-8 mb-4">
              <span>16°C</span>
              <span className="text-[#A09FB1] ml-4">11°C</span>
            </div>
          </div>
          <div
            id="small-card"
            className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
          >
            <div className="mx-auto mt-4">
              <span>Tomorrow</span>
            </div>
            <img src={shower} className="mt-3 w-[56px] mx-auto"></img>
            <div className="felx flex-col mx-auto mt-8 mb-4">
              <span>16°C</span>
              <span className="text-[#A09FB1] ml-4">11°C</span>
            </div>
          </div>
          <div
            id="small-card"
            className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
          >
            <div className="mx-auto mt-4">
              <span>Tomorrow</span>
            </div>
            <img src={shower} className="mt-3 w-[56px] mx-auto"></img>
            <div className="felx flex-col mx-auto mt-8 mb-4">
              <span>16°C</span>
              <span className="text-[#A09FB1] ml-4">11°C</span>
            </div>
          </div>
          <div
            id="small-card"
            className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
          >
            <div className="mx-auto mt-4">
              <span>Tomorrow</span>
            </div>
            <img src={shower} className="mt-3 w-[56px] mx-auto"></img>
            <div className="felx flex-col mx-auto mt-8 mb-4">
              <span>16°C</span>
              <span className="text-[#A09FB1] ml-4">11°C</span>
            </div>
          </div>
          <div
            id="small-card"
            className="bg-[#1E213A] w-32 h-44 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
          >
            <div className="mx-auto mt-4">
              <span>Tomorrow</span>
            </div>
            <img src={shower} className="mt-3 w-[56px] mx-auto"></img>
            <div className="felx flex-col mx-auto mt-8 mb-4">
              <span>16°C</span>
              <span className="text-[#A09FB1] ml-4">11°C</span>
            </div>
          </div>
        </div>
        <div id="highlights" className="mt-20 ml-40 ">
          <div>
            <span className="font-bold text-2xl">Today’s Hightlights</span>
          </div>
          <div
            id="cardsGrid"
            className="mt-8  grid-flow-row	grid-cols-1 xl:grid-cols-2  gap-12 grid"
          >
            <div
              id="big-card"
              className="bg-[#1E213A] w-80 h-52 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
            >
              <div className="mx-auto mt-5">
                <span>Wind status</span>
              </div>
              <div className="mx-auto  mt-3">
                <span className=" text-6xl font-bold">7</span>
                <span className="text-4xl font-medium">mph</span>
              </div>
              <div className="flex mx-auto mt-8 mb-9">
                <RiArrowDownCircleFill className="m-auto h-8 w-8 text-[#FFFFFF4D]" />
                <span className="text-sm font-medium inline-block mt-2 ml-1">
                  WSW
                </span>
              </div>
            </div>
            <div
              id="big-card"
              className="bg-[#1E213A] w-80 h-52 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
            >
              <div className="mx-auto mt-5">
                <span>Humidity</span>
              </div>
              <div className="mx-auto  mt-3">
                <span className=" text-6xl font-bold">84</span>
                <span className="text-4xl font-normal">%</span>
              </div>
              <div className="mt-8 mb-9 mx-12">
                <div className="flex justify-between mb-1 font-bold text-xs text-[#A09FB1]">
                  <span className="">0</span>
                  <span className="">50</span>
                  <span className="">100</span>
                </div>
                <div className="grow bg-[#E7E7EB] rounded-full h-2.5 dark:bg-gray-700 ">
                  <div className="bg-[#FFEC65] h-2.5 rounded-full w-[70%]"></div>
                </div>
                <div className="flex flex-row-reverse mt-1 font-bold text-xs text-[#A09FB1]">
                  <span className="">%</span>
                </div>
              </div>
            </div>
            <div
              id="small-card-visibility"
              className="bg-[#1E213A] w-80 h-40 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
            >
              <div className="mx-auto mt-5">
                <span>Visibility</span>
              </div>
              <div className="mx-auto mt-2 mb-9">
                <span className="text-6xl font-bold">6,4</span>
                <span className="text-4xl font-medium ml-3">miles</span>
              </div>
            </div>
            <div
              id="small-card-air-pressure"
              className="bg-[#1E213A] w-80 h-40 flex flex-col justify-center font-medium text-base  text-[#E7E7EB]"
            >
              <div className="mx-auto mt-5">
                <span>Air Pressure</span>
              </div>
              <div className="mx-auto mt-2 mb-9">
                <span className="text-6xl font-bold">998</span>
                <span className="text-4xl font-medium ml-3">mb</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
