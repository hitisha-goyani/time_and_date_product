import { useState } from "react";

export default function Weekday() {
  const today = new Date();

  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const [result, setResult] = useState(null);

  const buildDate = () =>
    new Date(date.year, date.month - 1, date.day);

  const isLeapYear = (y) =>
    (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  function getDayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function getWeekNumber(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  }

  function calculate() {
    const d = buildDate();

    if (isNaN(d)) return;

    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekday = weekdayNames[d.getDay()];
    const dayOfYear = getDayOfYear(d);
    const totalDays = isLeapYear(d.getFullYear()) ? 366 : 365;
    const daysLeft = totalDays - dayOfYear;

    const daysInMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0
    ).getDate();

    const weekdayInMonth = Math.ceil(d.getDate() / 7);

    setResult({
      dateText: `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      weekday,
      dayOfYear,
      daysLeft,
      weekNumber: getWeekNumber(d),
      weekdayInMonth,
      daysInMonth,
      totalDays,
    });
  }

  return (
    <>
      {/* INPUT SECTION */}
      <div className="date-grid">
        <div>
          <h3>Day:</h3>
          <input
            type="number"
            value={date.day}
            onChange={(e) =>
              setDate({ ...date, day: e.target.value })
            }
          />
        </div>

        <div>
          <h3>Month:</h3>
          <input
            type="number"
            value={date.month}
            onChange={(e) =>
              setDate({ ...date, month: e.target.value })
            }
          />
        </div>

        <div>
          <h3>Year:</h3>
          <input
            type="number"
            value={date.year}
            onChange={(e) =>
              setDate({ ...date, year: e.target.value })
            }
          />
        </div>

        <button className="calc-btn small" onClick={calculate}>
          Show ▶
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="weekday-result">
          <h2>
            {result.dateText} is a{" "}
            <b>{result.weekday}</b>
          </h2>

          <h3>Additional facts</h3>
          <ul>
            <li>
              It is day number <b>{result.dayOfYear}</b> of the year,
              {` `}<b>{result.daysLeft}</b> days left.
            </li>
            <li>
              It is <b>{result.weekday}</b> number{" "}
              <b>{result.weekNumber}</b> out of 52 in {date.year}.
            </li>
            <li>
              It is <b>{result.weekday}</b> number{" "}
              <b>{result.weekdayInMonth}</b> of 4 in April {date.year}.
            </li>
            <li>
              Year {date.year} has{" "}
              <b>{result.totalDays}</b> days.
            </li>
            <li>
              April {date.year} has{" "}
              <b>{result.daysInMonth}</b> days.
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
