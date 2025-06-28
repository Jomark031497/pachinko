import { startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from "date-fns";

export type Period = "this-week" | "this-month" | "this-year";

export function getPeriodRange(period: "this-week" | "this-month" | "this-year") {
  const now = new Date();
  switch (period) {
    case "this-week":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "this-month":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "this-year":
      return { start: startOfYear(now), end: endOfYear(now) };
    default:
      throw new Error("Invalid period");
  }
}
