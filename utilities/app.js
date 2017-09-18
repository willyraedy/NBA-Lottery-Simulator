const createArrOfTeams = require('./utilityFuncs/formatData');
const addRank = require('./utilityFuncs/addRank');
const Model = require('./model/Model');

let flatCombos = [34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33];

function getCombos(comboType) {
  switch (comboType) {
    case 'current':
      return [250, 199, 156, 119, 88, 63, 43, 28, 17, 11, 8, 7, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    default:
      return [250, 199, 156, 119, 88, 63, 43, 28, 17, 11, 8, 7, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

function simulateDraft(yearObj, numSims, comboType, numPicks) {
  const formattedTeamData = addRank(createArrOfTeams(yearObj));
  const combos = getCombos(comboType);
  const model = new Model('current', formattedTeamData, numSims, combos, numPicks);
  model._assignCombos();
  model.assignAllFirstPickProbabilities();
  model.assignProbabilities();
  return model.modelResults;
}

module.exports = simulateDraft;
