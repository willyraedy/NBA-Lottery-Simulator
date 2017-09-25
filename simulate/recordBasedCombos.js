function assignCombosByRecord(teamDataArr, max, shift, slope) {
  max = +max;
  shift = +shift;
  slope = +slope;
  return teamDataArr.map((teamObj) => {
    const wins = 82 - teamObj.losses;
    teamObj.combinations = max * (1 / (1 + Math.exp((slope * wins) - shift)));
    return teamObj;
  });
}

module.exports = assignCombosByRecord;
