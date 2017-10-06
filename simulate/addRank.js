function addRank(arrOfTeamObj) {
  const lotteryLength = arrOfTeamObj.filter(teamObj => teamObj.losses).length - 16;
  const lossesObj = {};

  return arrOfTeamObj.map((teamObj, i) => {
    const rank = i + 1;
    const numOfLosses = teamObj.losses;

    if (!teamObj.losses) { teamObj.rank = null; }
    else if (lossesObj[numOfLosses] && lossesObj[numOfLosses].rank !== lotteryLength) {
      teamObj.rank = lossesObj[numOfLosses].rank;
    } else {
      teamObj.rank = rank;
      lossesObj[numOfLosses] = teamObj;
    }
    return teamObj;
  });
}

module.exports = addRank;
