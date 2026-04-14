export function validateNepaliPhoneNumber(phone) {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }
  const trimmed = phone.trim();
const phoneRegex = /^(98|97)[0-9]{8}$/;
  if (!phoneRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)' };
  }
  return { isValid: true, error: null };
}
