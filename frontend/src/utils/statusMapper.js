export function getStatusText(statusId) {
  const statusMap = {
    1: 'Submitted',
    2: 'Assigned',
    3: 'In Progress',
    4: 'Completed',
    5: 'Declined'
  };
  return statusMap[statusId] || 'Unknown';
}
