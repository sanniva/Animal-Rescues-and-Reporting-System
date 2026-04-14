import { getStatusText } from './statusMapper';

describe('Report Status Mapping Unit Tests', () => {
  test('UT-23: Should return Submitted for status_id = 1', () => {
    expect(getStatusText(1)).toBe('Submitted');
  });
  test('UT-24: Should return Assigned for status_id = 2', () => {
    expect(getStatusText(2)).toBe('Assigned');
  });
  test('UT-25: Should return In Progress for status_id = 3', () => {
    expect(getStatusText(3)).toBe('In Progress');
  });
  test('UT-26: Should return Completed for status_id = 4', () => {
    expect(getStatusText(4)).toBe('Completed');
  });
  test('UT-27: Should return Declined for status_id = 5', () => {
    expect(getStatusText(5)).toBe('Declined');
  });
  test('UT-28: Should return Unknown for invalid status_id', () => {
    expect(getStatusText(99)).toBe('Unknown');
  });
});
