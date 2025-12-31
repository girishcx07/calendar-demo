import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "./Calendar";
import styles from "./Calendar.module.css";

describe("Calendar Component", () => {
  it("renders the correct month and year in the header", () => {
    const date = new Date(2023, 9, 15); // Set the initial date to October 15, 2023
    render(<Calendar date={date} />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });

  it("renders days of the week", () => {
    const date = new Date(2023, 9, 15);
    render(<Calendar date={date} />);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("highlights the selected date", () => {
    const date = new Date(2023, 9, 15); // Set the initial date to October 15, 2023
    render(<Calendar date={date} />);

    // Find the cell with the text '15' and make sure it has 'selected' class and use testid to find the element
    const selectedDate = screen.getByTestId("selected-date");
    expect(selectedDate).toHaveTextContent("15");
    expect(selectedDate).toHaveClass(styles.selected);
  });

  it("renders dates from the previous month if the month does not start on Sunday", () => {
    // Initialize a date in September 2023, which does not start on a Sunday, to verify padding days rendering
    const septDate = new Date(2023, 8, 15); // Set the date to September 15, 2023
    const { container } = render(<Calendar date={septDate} />);

    // Verify that there are cells with the 'other-month' class, indicating previous month's days are present
    const otherMonthCells = container.getElementsByClassName(styles.otherMonth);
    expect(otherMonthCells.length).toBeGreaterThan(0);
  });

  it("renders correct number of days for a standard month view (usually 5 or 6 weeks)", () => {
    const date = new Date(2023, 9, 15);
    const { container } = render(<Calendar date={date} />);
    // Find the number of cells and make sure it is 35

    const cells = container.getElementsByClassName(styles.calendarCell);
    expect(cells.length).toBe(35);
  });

  it("calls onChange when clicking a date", () => {
    const date = new Date(2023, 9, 15);
    const onChange = vi.fn();
    render(<Calendar date={date} onChange={onChange} />);

    // Find the day element for the 20th and simulate a user click
    const day20 = screen.getByText("20");
    fireEvent.click(day20);

    // Ensure the onChange callback was triggered with the correct date object (October 20, 2023)
    expect(onChange).toHaveBeenCalledTimes(1);
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(20);
    expect(calledDate.getMonth()).toBe(9);
    expect(calledDate.getFullYear()).toBe(2023);
  });

  it("navigates to previous month when clicking prev button", () => {
    const date = new Date(2023, 9, 15);
    const onChange = vi.fn();
    render(<Calendar date={date} onChange={onChange} />);

    const prevBtn = screen.getByTestId("prev-button");
    fireEvent.click(prevBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    // The returned date should be for September 2023, confirming the previous month navigation
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getMonth()).toBe(8);
  });

  it("navigates to next month when clicking next button", () => {
    const date = new Date(2023, 9, 15);
    const onChange = vi.fn();
    render(<Calendar date={date} onChange={onChange} />);

    const nextBtn = screen.getByTestId("next-button");
    fireEvent.click(nextBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    // The returned date should be for November 2023, confirming the next month navigation
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getMonth()).toBe(10);
  });
});
