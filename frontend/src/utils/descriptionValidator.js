export function validateReportDescription(description) {
  if (!description || description.trim() === '') {
    return { isValid: false, error: 'Description is required' };
  }
  const trimmed = description.trim();
  if (trimmed.length < 20) {
    return { isValid: false, error: `Description must be at least 20 characters (${trimmed.length}/20)` };
  }
  return { isValid: true, error: null, characterCount: trimmed.length };
}
