export function isFileSizeValid(fileSizeInBytes, maxSizeInMB = 5) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSizeInBytes <= maxSizeInBytes;
}
