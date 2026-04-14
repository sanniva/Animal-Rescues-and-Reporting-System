import { validatePassword } from './passwordValidator';

describe('Password Validation Unit Tests', () => {
  test('UT-01: Should reject password without uppercase', () => {
    const result = validatePassword('weakpassword123@');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('uppercase');
  });
  test('UT-02: Should reject password without lowercase', () => {
    const result = validatePassword('WEAKPASSWORD123@');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('lowercase');
  });
  test('UT-03: Should reject password without number', () => {
    const result = validatePassword('WeakPass@!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('number');
  });
  test('UT-04: Should reject password without special character', () => {
    const result = validatePassword('WeakPass123');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('special character');
  });
  test('UT-05: Should reject password shorter than 8 characters', () => {
    const result = validatePassword('W@1');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 8 characters');
  });
  test('UT-06: Should accept valid strong password', () => {
    const result = validatePassword('StrongP@ss123');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});
