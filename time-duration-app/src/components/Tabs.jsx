export default function Tabs({ active, setActive }) {
  const tabs = [
    "Count Days",
    "Add Days",
    "Workdays",
    "Add Workdays",
    "Weekday",
    "Week No",
  ];

  return (
    <div className="tabs">
      {tabs.map((t) => (
        <span
          key={t}
          className={active === t ? "active" : ""}
          onClick={() => setActive(t)}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
