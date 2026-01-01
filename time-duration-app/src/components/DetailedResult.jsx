export default function DetailedResult({ data }) {
  if (!data) return null;

  return (
    <div className="result-box">
      <div className="left">
        <p><strong>From:</strong> {data.from.toString()}</p>
        <p><strong>To:</strong> {data.to.toString()}</p>

        <h2>
          Result: {data.totalDays} days, {data.hours} hour,
          {data.minutes} minutes and {data.seconds} seconds
        </h2>

        <p>
          Or {data.years} years, {data.months} months, {data.days} days
        </p>
      </div>

      <div className="right">
        <h3>Alternative time units</h3>
        <ul>
          <li>{data.totalSeconds.toLocaleString()} seconds</li>
          <li>{data.totalMinutes.toLocaleString()} minutes</li>
          <li>{data.totalHours.toLocaleString()} hours</li>
          <li>{data.totalDays} days</li>
          <li>{data.totalWeeks} weeks</li>
          <li>{data.percentOfYear}% of a common year</li>
        </ul>
      </div>
    </div>
  );
}
