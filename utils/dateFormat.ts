export function getISTDateFromUTC(timestamp: string) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata'
  };
  return date.toLocaleString('en-US', options);
}

export function getISTTimeFromUTC(timestamp: string) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
  };
  return date.toLocaleString('en-US', options);
}
