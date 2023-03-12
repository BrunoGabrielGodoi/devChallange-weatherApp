import { Button } from "@material-tailwind/react";
import axios from "axios";
// import React from "react";
import { useState, useRef, Component } from "react";
import { useQuery } from "react-query";

export function SearchBar() {
  let [inputValue, setInputValue] = useState("");
  const textInput = useRef(null);
  let latitude = -23.58,
    longitude = -46.36;
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });

  ////
  return (
    <div className={`flex flex-row h-14 mt-20 `}>
      <input
        autoFocus
        type="text"
        value={inputValue}
        onKeyDown={(event) => {
          'if (event.key == "Enter") AddItem();';
        }}
        className={`bg-[#1E213A] p-3 border-[1px] flex-auto h-[100%] mx-auto w-3/5  font-['montserrat'] font-[14px]`}
        placeholder="Search Location?"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <Button
        type="submit"
        children={"Search"}
        className={`bg-[#3C47E9]  flex-auto h-[100%] w-1/5 ml-3 text-[white]  font-['montserrat']`}
        onClick={() => "AddItem()"}
      />
    </div>
  );
}
