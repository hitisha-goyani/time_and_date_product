export function calculateDuration(start, end) {
  let s = new Date(start);
  let e = new Date(end);

  if (e < s) [s, e] = [e, s];

  let years = e.getFullYear() - s.getFullYear();
  let months = e.getMonth() - s.getMonth();
  let days = e.getDate() - s.getDate();

  if (days < 0) {
    months--;
    days += new Date(e.getFullYear(), e.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let diffMs = e - s;
  let hours = Math.floor(diffMs / 36e5) % 24;
  let minutes = Math.floor(diffMs / 6e4) % 60;
  let seconds = Math.floor(diffMs / 1000) % 60;

  return { years, months, days, hours, minutes, seconds };
}
