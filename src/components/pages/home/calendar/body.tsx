"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCalendar } from "./context";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarBody() {
  const { currentMonth } = useCalendar();

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(firstDayOfMonth);
  const calendarEnd = endOfWeek(lastDayOfMonth);

  // Get all days that should be displayed in the calendar
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Weekday headers */}
      {WEEKDAYS.map((day) => (
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}

      {/* Date buttons */}
      {calendarDays.map((day) => (
        <Link href={`/goals/${format(day, "yyyy-MM-dd")}`} key={day.toString()}>
          <Button
            variant="outline"
            className={`w-full ${
              !isSameMonth(day, currentMonth) ? "opacity-30" : ""
            }`}
          >
            {format(day, "d")}
          </Button>
        </Link>
      ))}
    </div>
  );
}
