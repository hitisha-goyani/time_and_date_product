import { useState } from "react";
import AddWorkdaysResult from "./AddWorkdaysResult";

export default function AddWorkdays() {
  const today = new Date();

  const [start, setStart] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const [mode, setMode] = useState("add");
  const [days, setDays] = useState("");
  const [result, setResult] = useState(null);

  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

  const buildDate = () =>
    new Date(start.year, start.month - 1, start.day);

  function calculate() {
    if (!days) return;

    const totalDays = Number(days);
    let current = buildDate();

    let workdayCount = 0;
    let calendarDays = 0;
    let skippedDays = 0;
    let skippedSundays = [];

    while (workdayCount < totalDays) {
      current.setDate(
        current.getDate() + (mode === "add" ? 1 : -1)
      );
      calendarDays++;

      if (isWeekend(current)) {
        skippedDays++;
        if (current.getDay() === 0) {
          skippedSundays.push(new Date(current));
        }
      } else {
        workdayCount++;
      }
    }

    setResult({
      startDate: buildDate(),
      addedDays: totalDays,
      resultDate: new Date(current),
      calendarDays,
      skippedDays,
      skippedSundays,
      skippedHolidays: [], // ready for future
    });
  }

  return (
  <div className="addworkdays-page">
    <h2 className="page-title">Add / Subtract Workdays</h2>
    <p className="page-subtitle">
      Calculate a new date by adding or subtracting workdays
    </p>

    <div className="card">
      {/* START DATE */}
      <div className="section">
        <h3>Start Date</h3>

        <div className="date-parts">
          <input
            type="number"
            placeholder="DD"
            value={start.day}
            onChange={(e) =>
              setStart({ ...start, day: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="MM"
            value={start.month}
            onChange={(e) =>
              setStart({ ...start, month: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="YYYY"
            value={start.year}
            onChange={(e) =>
              setStart({ ...start, year: e.target.value })
            }
          />
        </div>

        <span className="link-btn">Today</span>
      </div>

      {/* OPTIONS */}
      <div className="section row">
        <div>
          <h3>Mode</h3>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="add">➕ Add</option>
            <option value="subtract">➖ Subtract</option>
          </select>
        </div>

        <div>
          <h3>Workdays</h3>
          <input
            type="number"
            placeholder="e.g. 25"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
      </div>

      <button className="primary-btn" onClick={calculate}>
        Calculate New Date
      </button>
    </div>

    {/* RESULT */}
    {result && (
      <div className="result-wrapper">
        <AddWorkdaysResult data={result} />
      </div>
    )}
  </div>
);
}
