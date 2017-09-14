function addRank(arrOfTeamObj) {
  const sortedArr = arrOfTeamObj.sort((firstTeamObj, secondTeamObj) => {
    return secondTeamObj.losses - firstTeamObj.losses;
  });

  let lossesObj = {};

  return sortedArr.map((teamObj, i) => {
    let rank = i + 1;
    let numOfLosses = teamObj.losses;

    if (!teamObj.losses) { teamObj.rank = null; }
    else if (lossesObj.hasOwnProperty(numOfLosses)) {
      teamObj.rank = lossesObj[numOfLosses].rank;
    } else {
      teamObj.rank = rank
      lossesObj[numOfLosses] = teamObj
    }
    return teamObj;
  });
}

module.exports = addRank;
