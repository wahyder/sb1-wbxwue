export interface TimeOption {
  label: string;
  value: string;
}

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
  period: 'AM' | 'PM';
}