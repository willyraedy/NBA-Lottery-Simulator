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

const convertQueryParamsToNumbers = (obj, keys) => {
  const clone = Object.assign({}, obj);
  keys.forEach((key) => {
    if (clone[key]) {
      if (typeof clone[key] === 'string') clone[key] = +clone[key];
      else if (Array.isArray(clone[key])) clone[key] = clone[key].map(el => +el);
      else throw new Error('Unexpected parameter data type'); // better error handling here
    }
  });
  return clone;
};

const sortByLossesThenName = (teamArr) => {
  return teamArr.sort((team1, team2) => {
    if (team1.losses !== team2.losses) return team2.losses - team1.losses;
    if (team1.team < team2.team) return -1;
    return 1;
  });
};

const runSimulations = function (params) {
  const { season, numSims, combos, numPicks, type, shift, slope, numSeasons } = params;
  const formattedTeamData = addRank(sortByLossesThenName(createArrOfTeams(season)));

  let teamsWithCombos;
  if (type === 'Rank') teamsWithCombos = assignCombosByRank(formattedTeamData, combos);
  else if (type === 'Record') teamsWithCombos = assignCombosByRecord(formattedTeamData, shift, slope, numSeasons);
  else throw new Error('Unrecognized model type');

  const totalCombos = calculateTotalFirstPickCombos(teamsWithCombos);
  const teamsWithProbs = assignAllFirstPickProbabilities(teamsWithCombos, formattedTeamData, totalCombos);
  const results = assignProbabilities(formattedTeamData, teamsWithProbs, numPicks, numSims, totalCombos);
  return sortByLossesThenName(results);
};

module.exports = runSimulations;
