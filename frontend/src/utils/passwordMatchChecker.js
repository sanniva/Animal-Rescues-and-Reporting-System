export function doPasswordsMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { doMatch: false, message: 'Passwords do not match' };
  }
  return { doMatch: true, message: 'Passwords match' };
}
