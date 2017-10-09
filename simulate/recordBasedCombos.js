function assignCombosByRecord(teamDataArr, shift, slope, numSeasons) {
  return teamDataArr.map((teamObj) => {
    const numOfLotteryTeams = teamDataArr.filter(team => team.losses).length - 16;
    const wins = (82 * (numSeasons + 1)) - teamObj.losses;
    if (teamObj.rank > numOfLotteryTeams) teamObj.combinations = 0;
    else teamObj.combinations = Math.round(140 * (1 / (1 + Math.exp((slope * wins) - shift))));
    return teamObj;
  });
}

module.exports = assignCombosByRecord;
