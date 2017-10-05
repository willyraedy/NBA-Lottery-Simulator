function assignCombosByRecord(teamDataArr, max, shift, slope, numSeasons) {
  return teamDataArr.map((teamObj) => {
    const wins = (82 * (numSeasons + 1)) - teamObj.losses;
    teamObj.combinations = max * (1 / (1 + Math.exp((slope * wins) - shift)));
    return teamObj;
  });
}

module.exports = assignCombosByRecord;
