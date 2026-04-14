import { validateEmail } from './emailValidator';

describe('Email Validation Unit Tests', () => {
  test('UT-07: Should reject email without @ symbol', () => {
    const result = validateEmail('invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('@');
  });
  test('UT-08: Should reject email without domain', () => {
    const result = validateEmail('user@');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('@');
  });
  test('UT-09: Should accept valid email', () => {
    const result = validateEmail('user@example.com');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});
