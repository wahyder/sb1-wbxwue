import { convertTo24Hour, formatTimeValue } from './time-picker.utils';

describe('Time Picker Utils', () => {
  describe('convertTo24Hour', () => {
    it('should convert 12 AM to 0', () => {
      expect(convertTo24Hour(12, 'AM')).toBe(0);
    });

    it('should convert 1 PM to 13', () => {
      expect(convertTo24Hour(1, 'PM')).toBe(13);
    });

    it('should keep 3 AM as 3', () => {
      expect(convertTo24Hour(3, 'AM')).toBe(3);
    });

    it('should keep 12 PM as 12', () => {
      expect(convertTo24Hour(12, 'PM')).toBe(12);
    });
  });

  describe('formatTimeValue', () => {
    it('should format time with padding', () => {
      expect(formatTimeValue(9, '05', '30')).toBe('09:05:30');
    });

    it('should handle double digit hours', () => {
      expect(formatTimeValue(23, '59', '59')).toBe('23:59:59');
    });

    it('should pad single digit hours with zero', () => {
      expect(formatTimeValue(0, '00', '00')).toBe('00:00:00');
    });
  });
});