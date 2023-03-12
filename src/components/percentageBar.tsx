export function PercentageBar({ value }: { value: number }) {
  return (
    <div className="mt-8 mb-9 mx-12">
      <div className="flex justify-between mb-1 font-bold text-xs text-[#A09FB1]">
        <span className="">0</span>
        <span className="">50</span>
        <span className="">100</span>
      </div>
      <div className="grow bg-[#E7E7EB] rounded-full h-2.5 dark:bg-gray-700 ">
        <div
          className={`bg-[#FFEC65] h-2.5 rounded-full `}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="flex flex-row-reverse mt-1 font-bold text-xs text-[#A09FB1]">
        <span className="">%</span>
      </div>
    </div>
  );
}
