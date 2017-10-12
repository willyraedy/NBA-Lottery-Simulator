const logitFunc = require('./logitFunc');

function assignCombosByRecord(teamDataArr, shift, slope, numSeasons) {
  return teamDataArr.map((teamObj) => {
    const numOfLotteryTeams = teamDataArr.filter(team => team.losses).length - 16;
    if (teamObj.rank > numOfLotteryTeams) teamObj.combinations = 0;
    else teamObj.combinations = logitFunc(slope, (82 * (numSeasons + 1)), teamObj.losses, shift);
    return teamObj;
  });
}

module.exports = assignCombosByRecord;
