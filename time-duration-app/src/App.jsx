import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import DateTimeBox from "./components/DateTimeBox";
import DetailedResult from "./components/DetailedResult";
import { getFullDuration } from "./utils/durationUtils";
import AddDays from "./components/AddDays"; 
import Workdays from "./components/Workdays";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("Count Days");

  const [start, setStart] = useState({ date: "", time: "" });
  const [end, setEnd] = useState({ date: "", time: "" });
  const [result, setResult] = useState(null);

  const now = () => {
    const d = new Date();
    return {
      date: d.toISOString().slice(0, 10),
      time: d.toTimeString().slice(0, 5),
    };
  };

  function calculate() {
    if (!start.date || !start.time || !end.date || !end.time) return;

    const s = `${start.date}T${start.time}:00`;
    const e = `${end.date}T${end.time}:00`;

    setResult(getFullDuration(s, e));
  }

  return (
    <>
      <Header />

      <div className="container">
        <h1>Time Calculator: Duration Between Two Times and Dates</h1>

        {/* ✅ Tabs now controlled */}
        <Tabs active={activeTab} setActive={setActiveTab} />

        {/* ✅ COUNT DAYS TAB */}
        {activeTab === "Count Days" && (
          <>
            <div className="box">
              <DateTimeBox
                title="Start Date"
                value={start}
                onChange={setStart}
                setNow={() => setStart(now())}
              />
              <DateTimeBox
                title="End Date"
                value={end}
                onChange={setEnd}
                setNow={() => setEnd(now())}
              />
            </div>

            <button className="calc-btn" onClick={calculate}>
              Calculate Duration
            </button>

            <DetailedResult data={result} />
          </>
        )}

        {/* ✅ ADD DAYS TAB */}
        {activeTab === "Add Days" && <AddDays />}

        {/*   workdays */}

        {activeTab === "Workdays" && <Workdays />}
      </div>
    </>
  );
}
