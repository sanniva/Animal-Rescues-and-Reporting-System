export function mapUserRole(user) {
  if (user.role_id === 3 || user.role === 'admin' || user.role_name === 'admin') {
    return 'admin';
  }
  if (user.role_id === 2 || user.role === 'volunteer' || user.role_name === 'volunteer') {
    return 'volunteer';
  }
  return 'user';
}
