"use client";

import { Button } from "@/components/ui/button";
import { useCalendar } from "./context";
import { format } from "date-fns";

export default function CalendarControls() {
  const { currentMonth, prevMonth, nextMonth } = useCalendar();

  return (
    <div className="flex justify-between items-center mb-4">
      <Button onClick={prevMonth} variant="outline">
        &lt;
      </Button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <Button onClick={nextMonth} variant="outline">
        &gt;
      </Button>
    </div>
  );
}
