export function CelsiusTo({ value, unit }: { value: number; unit: "C" | "F" }) {
  if (unit == "C") return value;
  return (value * 9) / 5 + 32;
}
