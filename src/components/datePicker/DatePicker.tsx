import useDatePicker from "../../hooks/useDatePicker";
import { DatePickerProps, CalendarRendererProps } from "./types";
import "./DatePicker.css";

const DatePicker = ({ onChange, predefinedRanges = [] }: DatePickerProps) => {
  const {
    currentMonth,
    endDate,
    currentYear,
    startDate,
    setCurrentMonth,
    setCurrentYear,
    setStartDate,
    setEndDate,
    formatDate,
    isWeekday,
    handleDateClick
  } = useDatePicker(onChange);

  const renderCalendar = ({ currentYear, currentMonth, startDate, endDate, formatDate, isWeekday, handleDateClick} : CalendarRendererProps) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay();
    const days = [];
  
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected = (startDate && formatDate(date) === formatDate(startDate)) || (endDate && formatDate(date) === formatDate(endDate));
  
      const isWithinRange = startDate && endDate && date >= startDate && date <= endDate;
  
      const className = `day ${isWeekday(date) ? "weekday" : "weekend"} ${isSelected ? "selected" : ""} ${isWithinRange && isWeekday(date) ? "in-range" : ""}`;
  
      days.push(
        <div
          key={i}
          className={className}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }
  
    return days;
  };

  return (
    <div className="center-container">
      <div className="weekday-date-range-picker">
      <div className="controls">
        <button onClick={() => setCurrentYear(currentYear - 1)}>&lt;</button>
        <span>{currentYear}</span>
        <button onClick={() => setCurrentYear(currentYear + 1)}>&gt;</button>
        <button onClick={() => setCurrentMonth((currentMonth + 11) % 12)}>
          &lt;
        </button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
        </span>
        <button onClick={() => setCurrentMonth((currentMonth + 1) % 12)}>
          &gt;
        </button>
      </div>
      <div className="calendar-day-names">
        <div className="day-name weekend">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name weekend">Sat</div>
      </div>
      <div className="calendar-grid">{renderCalendar({ currentYear, currentMonth, startDate, endDate, formatDate, isWeekday, handleDateClick })}</div>
      <div className="predefined-ranges">
        {predefinedRanges.map((range, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (range.range && range.range[0] && range.range[1]) {
                setStartDate(new Date(range.range[0]));
                setEndDate(new Date(range.range[1]));
              } else alert(`Invalid range provided : ${range}`);
            }}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DatePicker;