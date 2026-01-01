export default function DateTimeBox({ title, value, onChange, setNow }) {
  return (
    <div className="datetime-box">
      <h3>{title}</h3>

      <input
        type="date"
        value={value.date}
        onChange={(e) => onChange({ ...value, date: e.target.value })}
      />

      <input
        type="time"
        value={value.time}
        onChange={(e) => onChange({ ...value, time: e.target.value })}
      />

      <div className="links">
        <button onClick={setNow}>Now</button>
        <button onClick={() => onChange({ ...value, time: "00:00" })}>
          Start of Day
        </button>
        <button onClick={() => onChange({ ...value, time: "12:00" })}>
          Noon
        </button>
      </div>
    </div>
  );
}
