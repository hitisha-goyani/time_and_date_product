export default function Header() {
  return (
    <header className="calc-header">
      <div className="calc-header-inner">
        <div className="calc-logo">
          <span className="logo-icon">⏱️</span>
          <span className="logo-text">Time & Date Calculator</span>
        </div>

        <p className="calc-tagline">
          Simple tools to calculate days, workdays, weekdays, and week numbers
        </p>
      </div>
    </header>
  );
}
