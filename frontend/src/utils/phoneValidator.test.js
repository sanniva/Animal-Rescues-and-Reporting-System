import { validateNepaliPhoneNumber } from './phoneValidator';

describe('Phone Validation Unit Tests', () => {
  test('UT-10: Should reject phone not starting with 98 or 97', () => {
    const result = validateNepaliPhoneNumber('9640214595');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('98 or 97');
  });
  test('UT-11: Should reject phone with wrong length', () => {
    const result = validateNepaliPhoneNumber('984021459');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('10-digit');
  });
  test('UT-12: Should accept valid Nepali phone number', () => {
    const result = validateNepaliPhoneNumber('9840214595');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});
