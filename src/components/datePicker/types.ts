type DateRange = [string, string] | null;

export type DatePickerProps = {
  onChange: (dateRange: DateRange, weekends: string[]) => void;
  predefinedRanges?: { label: string; range: DateRange }[];
}

export type CalendarRendererProps = {
  currentYear: number, 
  currentMonth: number,
  startDate: Date | null,
  endDate: Date | null,
  formatDate: (date: Date) => string,
  isWeekday: (date: Date) => boolean,
  handleDateClick: (date: Date) => void
}
