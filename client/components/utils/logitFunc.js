export function roundToOneDecimal(val) {
  return Math.floor(10 * val) / 10;
}

export function calculatePercentage(combo, totalCombos) {
  return 100 * (combo / totalCombos);
}

export function logitFunc(max, slope, totalGames, losses, shift) {
  return max * (1 / (1 + Math.exp((slope * (totalGames - losses)) - shift)))
}

