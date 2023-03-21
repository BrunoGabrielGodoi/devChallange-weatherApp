import { Button } from "@material-tailwind/react";
import { Children, ReactElement } from "react";

export function UnitOption({
  degresOption,
  setDegresOption,
}: {
  degresOption: "C" | "F";
  setDegresOption: (value: "C" | "F") => void;
}) {
  return (
    <div className="flex flex-row md:justify-end justify-center space-x-4 mt-11 ">
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
  );
}
