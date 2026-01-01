export default function WorkdaysResult({ data }) {
  if (!data) return null;

  const format = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="result-box">
        <div className="left">
          <p>
            From and including: <b>{format(data.start)}</b>
          </p>
          <p>
            To, but <b>not including</b> {format(data.end)}
          </p>

          <p>
            Excluding <b>Weekends and public holidays</b>
            <br />
            in India – Nationwide
          </p>

          <hr />

          <h2>Result: {data.workdays || 0} days</h2>
        </div>

        <div className="right">
          <p>
            <b>
              {data.calendarDays || 0} calendar days –{" "}
              {(data.skippedDays || 0)} days skipped:
            </b>
          </p>

          <p>
            Excluded {(data.skippedSundays?.length || 0)} Sundays
          </p>

          <p>
            Excluded {(data.skippedHolidays?.length || 0)} holidays:
          </p>

          <ul>
            {(data.skippedHolidays || []).map((h, i) => (
              <li key={i}>
                {h.name} ({format(h.dateObj)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-footer">
        <span>◀ Make adjustment and calculate again</span>
        <span>Start Again ▶</span>
      </div>
    </>
  );
}
