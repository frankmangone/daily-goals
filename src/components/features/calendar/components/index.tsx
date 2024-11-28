"use client";

import { CalendarBody } from "./body";
import CalendarProvider from "./context";
import CalendarControls from "./controls";

export function Calendar() {
  return (
    <CalendarProvider>
      <div className="w-full max-w-md mx-auto">
        <CalendarControls />
        <CalendarBody />
      </div>
    </CalendarProvider>
  );
}
