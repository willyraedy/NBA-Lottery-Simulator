function addRank(arrOfTeamObj) {
  const sortedArr = arrOfTeamObj.sort((firstTeamObj, secondTeamObj) => secondTeamObj.losses - firstTeamObj.losses);

  const lossesObj = {};

  return sortedArr.map((teamObj, i) => {
    const rank = i + 1;
    const numOfLosses = teamObj.losses;

    if (!teamObj.losses) { teamObj.rank = null; }
    else if (lossesObj.hasOwnProperty(numOfLosses)) {
      teamObj.rank = lossesObj[numOfLosses].rank;
    } else {
      teamObj.rank = rank;
      lossesObj[numOfLosses] = teamObj;
    }
    return teamObj;
  });
}

module.exports = addRank;
