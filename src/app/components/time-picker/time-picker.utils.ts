export const convertTo24Hour = (hours: number, period: string): number => {
  if (period === 'PM' && hours < 12) return hours + 12;
  if (period === 'AM' && hours === 12) return 0;
  if (period === 'AM' && hours > 12) return hours - 12;
  return hours;
};

export const formatTimeValue = (hours: number, minutes: string, seconds: string): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
};