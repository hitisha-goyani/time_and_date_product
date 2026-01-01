export function getFullDuration(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (end < start) [start, end] = [end, start];

  const diffMs = end - start;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let remainingDays = end.getDate() - start.getDate();

  if (remainingDays < 0) {
    months--;
    remainingDays += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return {
    // formatted strings for UI
    from: start.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),

    to: end.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),

    // breakdown
    years,
    months,
    days: remainingDays,
    hours,
    minutes,
    seconds,

    // alternative units
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    totalWeeks,
    percentOfYear: ((totalDays / 365) * 100).toFixed(2),
  };
}
