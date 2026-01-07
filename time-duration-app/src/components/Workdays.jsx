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

    const values = days
      .split(/[ ,]+/)
      .map(Number)
      .filter(Boolean);

    const outputs = values.map((value) => {
      let current = buildDate();
      let workdays = 0;
      let calendarDays = 0;
      let skippedDays = 0;
      let skippedSundays = [];

      while (workdays < value) {
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
          workdays++;
        }
      }

      return {
        startDate: buildDate(),
        addedDays: value,
        resultDate: new Date(current),
        calendarDays,
        skippedDays,
        skippedSundays,
        skippedHolidays: [],
      };
    });

    setResult(outputs);
  }

  return (
    <>
      {/* START DATE */}
      <div className="date-grid">
        <div>
          <h3>Start Date</h3>

          <div className="date-parts">
            <label>
              Day:
              <input
                type="number"
                value={start.day}
                onChange={(e) =>
                  setStart({ ...start, day: e.target.value })
                }
              />
            </label>

            <label>
              Month:
              <input
                type="number"
                value={start.month}
                onChange={(e) =>
                  setStart({ ...start, month: e.target.value })
                }
              />
            </label>

            <label>
              Year:
              <input
                type="number"
                value={start.year}
                onChange={(e) =>
                  setStart({ ...start, year: e.target.value })
                }
              />
            </label>
          </div>

          <span className="link-btn">Today</span>
        </div>

        {/* ADD / SUBTRACT */}
        <div>
          <h3>Add/Subtract</h3>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="add">(+) Add</option>
            <option value="subtract">(-) Subtract</option>
          </select>
        </div>

        {/* DAYS */}
        <div>
          <h3>* Days</h3>
          <input
            type="text"
            placeholder="25 or 10, 20, 65"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
      </div>

      {/* OPTIONS */}
      <div className="days-result">
        <label>Days in Results:</label>
        <select>
          <option>Exclude</option>
          <option>Include</option>
        </select>

        <select>
          <option>Weekends and public holidays</option>
        </select>

        <p className="hint">
          Holidays for India – Nationwide.
          <span className="link"> Change Country</span> /
          <span className="link"> Change State</span>
        </p>

        <label>
          <input type="checkbox" /> Repeat
        </label>
      </div>

      <button className="calc-btn" onClick={calculate}>
        Calculate New Date
      </button>

      {/* RESULT */}
      {result &&
        result.map((r, i) => (
          <AddWorkdaysResult key={i} data={r} />
        ))}
    </>
  );
}
