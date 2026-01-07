export default function AddWorkdaysResult({ data }) {
  const format = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="result-box green">
      <div className="left">
        <p>
          From <b>{format(data.startDate)}</b> +{" "}
          <b>{data.addedDays} days</b>
        </p>

        <p>
          Excluding <b>Weekends and public holidays</b>
          <br />
          in India – Nationwide
        </p>

        <hr />

        <h2>Result: {format(data.resultDate)}</h2>
      </div>

      <div className="right">
        <p>
          <b>
            {data.calendarDays} calendar days –{" "}
            {data.skippedDays} days skipped:
          </b>
        </p>

        <p>Excluded {data.skippedSundays.length} Sundays</p>

        <p>Excluded {data.skippedHolidays.length} holidays</p>
      </div>
    </div>
  );
}
