const createArrOfTeams = require('./formatData');
const addRank = require('./addRank');
const assignProbabilities = require('./assignProbabilities');

const assignCombosByRank = require('./rankBasedCombos');
const assignCombosByRecord = require('./recordBasedCombos');

const calculateTotalFirstPickCombos = function (teamDataArr) {
  return teamDataArr.reduce((totalCombos, teamObj) => totalCombos + teamObj.combinations, 0);
};

const assignAllFirstPickProbabilities = function (modelResults, teamDataArr, totalCombos) {
  return modelResults.map((teamObj) => {
    teamObj.firstPickPercentage = (teamObj.combinations / totalCombos) * 100;
    return teamObj;
  });
};

const runSimulations = function (params) {
  const { season, numSims, combos, numPicks, type, max, shift, slope } = params;
  const formattedTeamData = addRank(createArrOfTeams(season));

  let teamsWithCombos;
  if (type === 'Rank') teamsWithCombos = assignCombosByRank(formattedTeamData, combos);
  else if (type === 'Record') teamsWithCombos = assignCombosByRecord(formattedTeamData, max, shift, slope);
  else throw new Error('Unrecognized model type');
  console.log('Teams with combos: ', teamsWithCombos);
  const totalCombos = calculateTotalFirstPickCombos(teamsWithCombos);
  const teamsWithProbs = assignAllFirstPickProbabilities(teamsWithCombos, formattedTeamData, totalCombos);
  return assignProbabilities(formattedTeamData, teamsWithProbs, numPicks, numSims, totalCombos);
};

module.exports = runSimulations;
