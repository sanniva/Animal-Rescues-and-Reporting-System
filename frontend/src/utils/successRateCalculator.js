export function calculateSuccessRate(completedTasks, totalTasks) {
  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}
