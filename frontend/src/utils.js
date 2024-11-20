export function mathPercentDifference(first, second) {
  return 100 * Math.abs((first - second) / ((first + second) / 2)).toFixed(4);
}

export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
