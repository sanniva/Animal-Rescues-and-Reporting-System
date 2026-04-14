import { calculateSuccessRate } from './successRateCalculator';

describe('Success Rate Calculation Unit Tests', () => {
  test('UT-29: Should return 67% for 2 completed out of 3', () => {
    expect(calculateSuccessRate(2, 3)).toBe(67);
  });
  test('UT-30: Should return 100% for 5 completed out of 5', () => {
    expect(calculateSuccessRate(5, 5)).toBe(100);
  });
  test('UT-31: Should return 0% for 0 completed out of 5', () => {
    expect(calculateSuccessRate(0, 5)).toBe(0);
  });
  test('UT-32: Should return 0% for 0 completed out of 0', () => {
    expect(calculateSuccessRate(0, 0)).toBe(0);
  });
  test('UT-33: Should return 50% for 1 completed out of 2', () => {
    expect(calculateSuccessRate(1, 2)).toBe(50);
  });
});
