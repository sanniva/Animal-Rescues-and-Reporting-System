import { validateReportDescription } from './descriptionValidator';

describe('Description Validation Unit Tests', () => {
  test('UT-15: Should reject description shorter than 20 characters', () => {
    const result = validateReportDescription('Too short');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 20 characters');
  });
  test('UT-16: Should reject empty description', () => {
    const result = validateReportDescription('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Description is required');
  });
  test('UT-17: Should accept description with 20 or more characters', () => {
    const result = validateReportDescription('This description has more than twenty characters in it.');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});
