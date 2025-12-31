import React from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import styles from "./Calendar.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CalendarProps {
  date: Date;
  onChange?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ date, onChange }) => {
  const handlePrevMonth = () => {
    if (onChange) {
      onChange(subMonths(date, 1));
    }
  };

  const handleNextMonth = () => {
    if (onChange) {
      onChange(addMonths(date, 1));
    }
  };

  const handleDateClick = (day: Date) => {
    if (onChange) {
      onChange(day);
    }
  };

  const monthStart = startOfMonth(date); // get month start date 01-10-2025
  const monthEnd = endOfMonth(date); // get month end date 30-10-2025
  const startDate = startOfWeek(monthStart); // get week start date 26-09-2025
  const endDate = endOfWeek(monthEnd); // get week end date 06-12-2025

  // return the array of dates within the specified time interval.
  const daysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }); // 26-09-2025 to 06-12-2025

  console.log({
    monthStart,
    monthEnd,
    startDate,
    endDate,
    daysInMonth,
  });

  // maintain static array of week days
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={styles.calendar} data-testid="calendar">
      <div className={styles.calendarHeader}>
        <button
          onClick={handlePrevMonth}
          className={styles.navButton}
          data-testid="prev-button" // testid for prev button
        >
          <ChevronLeftIcon />
        </button>
        <span>{format(date, "MMMM yyyy")}</span>
        <button
          onClick={handleNextMonth}
          className={styles.navButton}
          data-testid="next-button" // testid for next button
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className={styles.calendarGrid}>
        {weekDays.map((day) => (
          <div key={day} className={styles.calendarDayHeader}>
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => handleDateClick(day)}
            className={clsx(styles.calendarCell, {
              [styles.otherMonth]: !isSameMonth(day, monthStart),
              [styles.selected]: isSameDay(day, date),
              [styles.interactive]: !!onChange,
            })}
            disabled={!onChange || !isSameMonth(day, monthStart)}
            data-testid={
              isSameDay(day, date) ? "selected-date" : "calendar-cell" // testid for selected date
            }
          >
            {isSameMonth(day, monthStart) ? format(day, "d") : ""}
          </button>
        ))}
      </div>
    </div>
  );
};
