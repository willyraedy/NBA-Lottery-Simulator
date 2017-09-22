const createArrOfTeams = require('./formatData');
const addRank = require('./addRank');
const assignProbabilities = require('./assignProbabilities');

const assignCombos = function (modelName, teamDataArr, combos) {
  // combos come through query as string, need to coerce to strings
  combos = combos.map(combo => +combo);

  let comboFunc;
  switch (modelName) {
    case 'Rank':
      comboFunc = require('./rankBasedCombos');
      break;
    default:
      throw new Error('Unrecognized model type');
  }
  return comboFunc(teamDataArr, combos);
};

const calculateTotalFirstPickCombos = function (teamDataArr) {
  return teamDataArr.reduce((totalCombos, teamObj) => totalCombos + teamObj.combinations, 0);
};

const assignAllFirstPickProbabilities = function (modelResults, teamDataArr, totalCombos) {
  return modelResults.map((teamObj) => {
    teamObj.firstPickPercentage = (teamObj.combinations / totalCombos) * 100;
    return teamObj;
  });
};

const runSimulations = function (yearObj, numSims, combos, numPicks, modelName) {
  const formattedTeamData = addRank(createArrOfTeams(yearObj));
  const teamsWithCombos = assignCombos(modelName, formattedTeamData, combos);
  const totalCombos = calculateTotalFirstPickCombos(teamsWithCombos);
  const teamsWithProbs = assignAllFirstPickProbabilities(teamsWithCombos, formattedTeamData, totalCombos);
  return assignProbabilities(formattedTeamData, teamsWithProbs, numPicks, numSims, totalCombos);
}

module.exports = runSimulations;
