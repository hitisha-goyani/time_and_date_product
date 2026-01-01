import { useState } from "react";

export default function AddDays() {
  const today = new Date();

  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const [mode, setMode] = useState("add"); // add | subtract

  const [values, setValues] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
  });

  const [result, setResult] = useState(null);

  function setToday() {
    const d = new Date();
    setDate({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }

  function calculateNewDate() {
    const base = new Date(
      date.year,
      date.month - 1,
      date.day
    );

    const sign = mode === "add" ? 1 : -1;

    base.setFullYear(base.getFullYear() + sign * Number(values.years));
    base.setMonth(base.getMonth() + sign * Number(values.months));
    base.setDate(
      base.getDate() +
        sign * (Number(values.weeks) * 7 + Number(values.days))
    );

    setResult(base);
  }

  return (
    <>
      {/* START DATE */}
      <div className="add-days-grid">
        <div>
          <h3>Start Date</h3>

          <div className="date-row">
            <label>Day:</label>
            <input
              type="number"
              value={date.day}
              onChange={(e) =>
                setDate({ ...date, day: e.target.value })
              }
            />

            <label>Month:</label>
            <input
              type="number"
              value={date.month}
              onChange={(e) =>
                setDate({ ...date, month: e.target.value })
              }
            />

            <label>Year:</label>
            <input
              type="number"
              value={date.year}
              onChange={(e) =>
                setDate({ ...date, year: e.target.value })
              }
            />
          </div>

          <button className="link-btn" onClick={setToday}>
            Today
          </button>
        </div>

        {/* ADD / SUBTRACT */}
        <div>
          <h3>Add/Subtract:</h3>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="add">(+) Add</option>
            <option value="subtract">(-) Subtract</option>
          </select>
        </div>

        {/* VALUES */}
        <div>
          <h3>Years:</h3>
          <input
            type="number"
            onChange={(e) =>
              setValues({ ...values, years: e.target.value })
            }
          />
        </div>

        <div>
          <h3>Months:</h3>
          <input
            type="number"
            onChange={(e) =>
              setValues({ ...values, months: e.target.value })
            }
          />
        </div>

        <div>
          <h3>Weeks:</h3>
          <input
            type="number"
            onChange={(e) =>
              setValues({ ...values, weeks: e.target.value })
            }
          />
        </div>

        <div>
          <h3>Days:</h3>
          <input
            type="number"
            onChange={(e) =>
              setValues({ ...values, days: e.target.value })
            }
          />
        </div>
      </div>

      {/* BUTTON */}
      <button className="calc-btn" onClick={calculateNewDate}>
        Calculate New Date
      </button>

      {/* RESULT */}
      {result && (
        <div className="result-box">
          <h3>Result</h3>
          <p>
            New date is{" "}
            <b>
              {result.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </b>
          </p>
        </div>
      )}
    </>
  );
}
