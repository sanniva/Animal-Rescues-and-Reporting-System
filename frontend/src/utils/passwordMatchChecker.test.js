import { doPasswordsMatch } from './passwordMatchChecker';

describe('Password Match Unit Tests', () => {
  test('UT-13: Should return false when passwords do not match', () => {
    const result = doPasswordsMatch('StrongP@ss123', 'StrongP@ss124');
    expect(result.doMatch).toBe(false);
    expect(result.message).toBe('Passwords do not match');
  });
  test('UT-14: Should return true when passwords match', () => {
    const result = doPasswordsMatch('StrongP@ss123', 'StrongP@ss123');
    expect(result.doMatch).toBe(true);
    expect(result.message).toBe('Passwords match');
  });
});
