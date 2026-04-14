export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }
  if (!email.includes('@') || !email.includes('.')) {
    return { isValid: false, error: 'Please include @ and valid domain' };
  }
  return { isValid: true, error: null };
}
