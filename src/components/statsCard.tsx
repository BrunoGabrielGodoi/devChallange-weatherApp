import { ReactElement } from "react";

export function StatsCard({
  title,
  value,
  valueType,
  size = "medium",
  children,
  isLoading,
}: {
  title: string;
  value: string;
  valueType: string;
  size?: "medium" | "large";
  children?: JSX.Element;
  isLoading: boolean;
}) {
  return (
    <div
      id="small-card-visibility"
      className={`bg-[#1E213A] md:min-w-[20rem] max-w-sm ${
        size == "medium" ? "h-40" : "h-52"
      } flex flex-col justify-center font-medium text-base  text-[#E7E7EB]`}
    >
      <div className="mx-auto mt-5">
        <span>{title}</span>
      </div>
      <div
        className={`mx-auto ${size == "medium" ? "mt-2 mb-9" : "mt-3"}  ${
          isLoading ? "bg-[#4a4e6d] animate-pulse h-20 w-48" : ""
        }`}
      >
        <span className={`text-6xl font-bold`}>{isLoading ? "" : value}</span>
        <span
          className={`text-4xl ${
            size == "medium" ? "font-medium ml-3" : "font-normal"
          } `}
        >
          {isLoading ? "" : valueType}
        </span>
      </div>
      {children ? children : ""}
    </div>
  );
}
