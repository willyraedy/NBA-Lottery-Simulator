export function roundToOneDecimal(val) {
  return Math.floor(10 * val) / 10;
}

export function calculatePercentage(combo, totalCombos) {
  return 100 * (combo / totalCombos);
}
