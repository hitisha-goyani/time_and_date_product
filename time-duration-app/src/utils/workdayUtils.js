import { holidaysIN } from "./holidaysIN";

export function calculateWorkdaysDetailed(
  startDate,
  endDate,
  includeEnd = false
) {
  // ✅ guard against empty values
  if (!startDate || !endDate) {
    return null;
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  // ✅ guard against invalid dates
  if (isNaN(start) || isNaN(end)) {
    return null;
  }

  if (!includeEnd) {
    end.setDate(end.getDate() - 1);
  }

  let calendarDays = 0;
  let workdays = 0;
  let skippedSundays = [];
  let skippedHolidays = [];

  let current = new Date(start);

  while (current <= end) {
    calendarDays++;

    const day = current.getDay();
    const iso = current.toISOString().slice(0, 10);

    if (day === 0) {
      skippedSundays.push(new Date(current));
    } 
    else if (holidaysIN.some((h) => h.date === iso)) {
      const h = holidaysIN.find((x) => x.date === iso);
      skippedHolidays.push({
        ...h,
        dateObj: new Date(current),
      });
    } 
    else {
      workdays++;
    }

    current.setDate(current.getDate() + 1);
  }

  // ✅ ALWAYS return arrays
  return {
    start,
    end,
    calendarDays,
    workdays,
    skippedDays:
      (skippedSundays?.length || 0) +
      (skippedHolidays?.length || 0),

    skippedSundays: skippedSundays || [],
    skippedHolidays: skippedHolidays || [],
  };
}
