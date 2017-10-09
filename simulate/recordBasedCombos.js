function assignCombosByRecord(teamDataArr, shift, slope, numSeasons) {
  return teamDataArr.map((teamObj) => {
    const wins = (82 * (numSeasons + 1)) - teamObj.losses;
    teamObj.combinations = 140 * (1 / (1 + Math.exp((slope * wins) - shift)));
    return teamObj;
  });
}

module.exports = assignCombosByRecord;
