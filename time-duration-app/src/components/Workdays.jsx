import { useState } from "react";
import WorkdaysResult from "./WorkdaysResult";

export default function Workdays() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [includeEnd, setIncludeEnd] = useState(false);
  const [result, setResult] = useState(null);

  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  function calculateWorkdays() {
    if (!start || !end) return;

    let s = new Date(start);
    let e = new Date(end);

    if (e < s) [s, e] = [e, s];

    let count = 0;
    let current = new Date(s);

    while (current <= e) {
      if (!isWeekend(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    if (!includeEnd && count > 0) {
      count--; // remove end date if unchecked
    }

    setResult(count);
  }

  return (
    <>
      <div className="date-grid">
        {/* START DATE */}
        <div>
          <h3>Start Date</h3>
          <input type="date" onChange={(e) => setStart(e.target.value)} />
          <div className="link-btn">Today</div>
        </div>

        {/* END DATE */}
        <div>
          <h3>End Date</h3>
          <input type="date" onChange={(e) => setEnd(e.target.value)} />
          <div className="link-btn">Today</div>
        </div>
      </div>

      {/* OPTIONS */}
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={includeEnd}
            onChange={(e) => setIncludeEnd(e.target.checked)}
          />
          Include end date in calculation (1 day is added)
        </label>
      </div>

      {/* DAYS IN RESULT */}
      <div className="days-result">
        <label>Days in Results:</label>
        <select>
          <option>Exclude</option>
          <option>Include</option>
        </select>

        <select>
          <option>Weekends</option>
          <option>Weekends and public holidays</option>
        </select>
      </div>

      <button className="calc-btn" onClick={calculateWorkdays}>
        Calculate Duration
      </button>

      {/* RESULT */}
      {result !== null && (
        <div className="result-box">
          <h3>Result</h3>
          <p>
            There are <b>{result}</b> workdays between the selected dates.
          </p>
        </div>
      )}

      <WorkdaysResult data={result} />
    </>
  );
}
