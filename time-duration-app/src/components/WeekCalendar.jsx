export default function WeekCalendar({ year, month, weekStart, weekEnd }) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayIndex = firstDay.getDay(); // Sun=0
  const daysInMonth = lastDay.getDate();

  const days = [];

  // empty cells before first day
  for (let i = 0; i < startDayIndex; i++) {
    days.push(null);
  }

  // month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  const isInWeek = (date) =>
    date >= weekStart && date <= weekEnd;

  return (
    <div className="calendar">
      <h3>
        {firstDay.toLocaleString("en-US", {
          month: "long",
        })}{" "}
        {year}
      </h3>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="cal-head">
            {d}
          </div>
        ))}

        {days.map((d, i) => (
          <div
            key={i}
            className={`cal-cell ${
              d && isInWeek(d) ? "highlight" : ""
            }`}
          >
            {d ? d.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
