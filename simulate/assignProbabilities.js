const simulateLotteryPick = function (teamDataArr, prevPicks, totalCombos) {
  let pickMade = false;
  let team;
  while (!pickMade) {
    const selectionNumber = Math.floor(Math.random() * totalCombos);
    let count = 0;
    for (let i = 0; i < teamDataArr.length; i++) {
      const teamObj = teamDataArr[i];
      count += teamObj.combinations;
      if (count > selectionNumber) {
        if (!prevPicks[teamObj.team] && teamObj.combinations) {
          team = teamObj;
          pickMade = true;
        }
        break;
      }
    }
  }
  return team;
};

const simulatePick = function (teamDataArr, draftData) {
  return teamDataArr.find(teamObj => !draftData.hasOwnProperty(teamObj.team));
};

const simulateDraft = function (teamDataArr, numOfLotteryPicks, pickData, totalCombos) {
  const draftData = {};
  // simulate the lottery picks
  for (let pickNum = 0; pickNum < numOfLotteryPicks; pickNum++) {
    const team = simulateLotteryPick(teamDataArr, draftData, totalCombos);
    const teamName = team.team;
    if (!pickData.hasOwnProperty(teamName)) {
      pickData[teamName] = [];
    }
    draftData[teamName] = true;
    if (pickData[teamName][pickNum]) pickData[teamName][pickNum] += 1;
    else pickData[teamName][pickNum] = 1;
    // pickData[teamName][pickNum] ? pickData[teamName][pickNum]++ : pickData[teamName][pickNum] = 1;
  }
  // calculate the rest of the draft picks
  const totalNumOfDraftPicks = teamDataArr.filter(teamObj => !!teamObj.losses).length - 16;
  // simulate the rest of the draft picks
  for (let pickNum = numOfLotteryPicks; pickNum < totalNumOfDraftPicks; pickNum++) {
    const team = simulatePick(teamDataArr, draftData);
    const teamName = team.team;
    if (!pickData.hasOwnProperty(teamName)) {
      pickData[teamName] = [];
    }
    draftData[teamName] = true;
    if (pickData[teamName][pickNum]) pickData[teamName][pickNum] += 1;
    else pickData[teamName][pickNum] = 1;
    // pickData[teamName][pickNum] ? pickData[teamName][pickNum]++ : pickData[teamName][pickNum] = 1;
  }
};

const manyDraftSimulations = function (teamDataArr, numOfLotteryPicks, numOfSimulations, totalCombos) {
  const simulationResults = {};
  for (let i = 0; i < numOfSimulations; i++) {
    simulateDraft(teamDataArr, numOfLotteryPicks, simulationResults, totalCombos);
  }
  Object.keys(simulationResults).forEach((key) => {
    for (let i = 0; i < simulationResults[key].length; i++) {
      let numOfPicks = simulationResults[key][i];
      if (!numOfPicks) numOfPicks = 0;
      simulationResults[key][i] = (numOfPicks / numOfSimulations) * 100;
    }
  });
  return simulationResults;
};

const assignProbabilities = function (teamDataArr, modelResults, numOfLotteryPicks, numOfSimulations, totalCombos) {
  const simulationResults = manyDraftSimulations(teamDataArr, numOfLotteryPicks, numOfSimulations, totalCombos);
  return modelResults.map((teamObj) => {
    if (simulationResults.hasOwnProperty(teamObj.team)) {
      teamObj.percentages = simulationResults[teamObj.team];
    } else {
      teamObj.percentages = [];
    }
    while (teamObj.percentages.length < teamDataArr.length) {
      teamObj.percentages.push(0);
    }
    return teamObj;
  });
};

module.exports = assignProbabilities;
