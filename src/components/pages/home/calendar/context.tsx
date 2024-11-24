"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CalendarContextData {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalendarContext = createContext<CalendarContextData>({
  currentMonth: new Date(),
  prevMonth: () => {},
  nextMonth: () => {},
});

export const useCalendar = (): CalendarContextData => {
  return useContext(CalendarContext);
};

export default function CalendarProvider(props: PropsWithChildren) {
  const { children } = props;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const value = {
    currentMonth,
    prevMonth,
    nextMonth,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
