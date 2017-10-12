function logitFunc(slope, totalGames, losses, shift) {
  return Math.ceil(140 * (1 / (1 + Math.exp((slope * (totalGames - losses)) - shift))));
}

module.exports = logitFunc;
