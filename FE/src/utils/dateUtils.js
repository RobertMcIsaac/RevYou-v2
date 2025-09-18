export function formatDateRange(startStr, endStr) {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : null;

  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' });
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short' });
  const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' });

  if (!end) {
    return `${day.format(start)} ${month.format(start)} ${year.format(start)} – now`;
  }

  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${day.format(start)}–${day.format(end)} ${month.format(start)} ${year.format(start)}`;
  } else if (sameYear) {
    return `${day.format(start)} ${month.format(start)} – ${day.format(end)} ${month.format(end)} ${year.format(end)}`;
  } else {
    return `${day.format(start)} ${month.format(start)} ${year.format(start)} – ${day.format(end)} ${month.format(end)} ${year.format(end)}`;
  }
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}