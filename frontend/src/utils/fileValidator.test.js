import { isFileSizeValid } from './fileValidator';

describe('File Size Validation Unit Tests', () => {
  test('UT-34: Should return true for file size 1MB (within 5MB limit)', () => {
    const oneMB = 1 * 1024 * 1024;
    expect(isFileSizeValid(oneMB)).toBe(true);
  });
  test('UT-35: Should return true for file size exactly 5MB', () => {
    const fiveMB = 5 * 1024 * 1024;
    expect(isFileSizeValid(fiveMB)).toBe(true);
  });
  test('UT-36: Should return false for file size 6MB (exceeds 5MB limit)', () => {
    const sixMB = 6 * 1024 * 1024;
    expect(isFileSizeValid(sixMB)).toBe(false);
  });
});
