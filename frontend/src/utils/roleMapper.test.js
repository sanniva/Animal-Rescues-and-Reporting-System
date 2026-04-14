import { mapUserRole } from './roleMapper';

describe('Role Mapping Unit Tests', () => {
  test('UT-18: Should return admin for role_id = 3', () => {
    expect(mapUserRole({ role_id: 3 })).toBe('admin');
  });
  test('UT-19: Should return admin for role = "admin"', () => {
    expect(mapUserRole({ role: 'admin' })).toBe('admin');
  });
  test('UT-20: Should return volunteer for role_id = 2', () => {
    expect(mapUserRole({ role_id: 2 })).toBe('volunteer');
  });
  test('UT-21: Should return volunteer for role = "volunteer"', () => {
    expect(mapUserRole({ role: 'volunteer' })).toBe('volunteer');
  });
  test('UT-22: Should return user for any other role', () => {
    expect(mapUserRole({ role_id: 1 })).toBe('user');
  });
});
