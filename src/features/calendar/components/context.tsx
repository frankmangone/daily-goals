"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CalendarContextData {
  today: Date;
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalendarContext = createContext<CalendarContextData>({
  today: new Date(),
  currentMonth: new Date(),
  prevMonth: () => {},
  nextMonth: () => {},
});

export const useCalendar = (): CalendarContextData => {
  return useContext(CalendarContext);
};

export default function CalendarProvider(props: PropsWithChildren) {
  const { children } = props;

  const [today] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today);

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const value = {
    today,
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
