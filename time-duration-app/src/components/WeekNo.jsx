import { useState } from "react";
import WeekCalendar from "./WeekCalendar";

export default function WeekNo() {
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [weekInput, setWeekInput] = useState({ week: "", year: "" });
  const [result, setResult] = useState(null);

  // ISO week number
  function getISOWeek(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  }

  function getWeekStartEnd(week, year) {
    const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
    const dow = simple.getUTCDay();
    const weekStart = simple;
    if (dow <= 4) {
      weekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
    } else {
      weekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
    }
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
    return { weekStart, weekEnd };
  }

  const format = (d) =>
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  function calculateFromDate() {
    const d = new Date(date.year, date.month - 1, date.day);
    if (isNaN(d)) return;

    const week = getISOWeek(d);
    const { weekStart, weekEnd } = getWeekStartEnd(week, d.getFullYear());

    setResult({
      week: `${week}/${d.getFullYear()}`,
      weekStart,
      weekEnd,
    });
  }

  function calculateFromWeek() {
    const week = Number(weekInput.week);
    const year = Number(weekInput.year);
    if (!week || !year) return;

    const { weekStart, weekEnd } = getWeekStartEnd(week, year);

    setResult({
      week: `${week}/${year}`,
      weekStart,
      weekEnd,
    });
  }

  return (
  <div className="weekno-page">
    {/* DATE INPUT */}
    <div className="card">
      <h3>Find week number from date</h3>
      <div className="row">
        <input placeholder="dd" value={date.day}
          onChange={(e) => setDate({ ...date, day: e.target.value })} />
        <input placeholder="mm" value={date.month}
          onChange={(e) => setDate({ ...date, month: e.target.value })} />
        <input placeholder="yyyy" value={date.year}
          onChange={(e) => setDate({ ...date, year: e.target.value })} />
        <button onClick={calculateFromDate}>Calculate</button>
      </div>
    </div>

    <div className="or-text">OR</div>

    {/* WEEK INPUT */}
    <div className="card">
      <h3>Find dates from week number</h3>
      <div className="row">
        <input placeholder="ww" value={weekInput.week}
          onChange={(e) => setWeekInput({ ...weekInput, week: e.target.value })} />
        <input placeholder="yyyy" value={weekInput.year}
          onChange={(e) => setWeekInput({ ...weekInput, year: e.target.value })} />
        <button onClick={calculateFromWeek}>Calculate</button>
      </div>
    </div>

    {/* RESULT */}
    {result && (
      <div className="result-layout">
        <div className="result-card">
          <p><b>Week:</b> {result.week}</p>
          <p><b>Start date:</b> {format(result.weekStart)}</p>
          <p><b>End date:</b> {format(result.weekEnd)}</p>
        </div>

        <WeekCalendar
          year={result.weekStart.getFullYear()}
          month={result.weekStart.getMonth()}
          weekStart={result.weekStart}
          weekEnd={result.weekEnd}
        />
      </div>
    )}
  </div>
);
}
