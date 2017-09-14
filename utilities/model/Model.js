function Model(modelName, arrOfTeams, numOfSimulations, combos, numOfLotteryPicks){
  this.arrOfTeams = arrOfTeams;
  this.params = {
    modelName,
    numOfSimulations,
    combos,
    numOfLotteryPicks,
    totalCombos: combos.reduce((a,b) => a + b),
  };
  this.modelResults = null;
}

Model.prototype._assignCombos = function() {
  let comboFunc;
  switch (this.params.modelName) {
    case 'current':
      comboFunc = require('../utilityFuncs/rankBasedCombos');
      break;
    default:
      throw new Error('Unrecognized model type');
  }
  this.modelResults = comboFunc(this.arrOfTeams, this.params.combos);
};

Model.prototype._simulateLotteryPick = function(prevPicks) {
  let pickMade = false;
  let team;
  while (!pickMade) {
      const selectionNumber = Math.floor(Math.random() * this.params.totalCombos);
      let count = 0;
      for (let i = 0; i < this.arrOfTeams.length; i++) {
        const teamObj = this.arrOfTeams[i];
        count += teamObj.combinations;
        if (count > selectionNumber && !prevPicks[teamObj.team] && teamObj.combinations) {
          team = teamObj;
          pickMade = true;
          break;
        }
      }
  }
  return team;
};

Model.prototype._simulatePick = function(draftData) {
  return this.arrOfTeams.find(teamObj => !draftData.hasOwnProperty(teamObj.team));
};

Model.prototype._simulateDraft = function(pickData) {
  const draftData = {};
  // simulate the lottery picks
  for (let pickNum = 0; pickNum < this.params.numOfLotteryPicks; pickNum++) {
    const team = this._simulateLotteryPick(draftData);
    const teamName = team.team;
    if (!pickData.hasOwnProperty(teamName)) {
      pickData[teamName] = [];
    }
    draftData[teamName] = true;
    pickData[teamName][pickNum] ? pickData[teamName][pickNum]++ : pickData[teamName][pickNum] = 1;
  }
  // simulate the rest of the draft picks
  for (let pickNum = this.params.numOfLotteryPicks; pickNum < this.arrOfTeams.length; pickNum++) {
    const team = this._simulatePick(draftData);
    const teamName = team.team;
    if (!pickData.hasOwnProperty(teamName)) {
      pickData[teamName] = [];
    }
    draftData[teamName] = true;
    pickData[teamName][pickNum] ? pickData[teamName][pickNum]++ : pickData[teamName][pickNum] = 1;
  }
};

Model.prototype._manyDraftSimulations = function() {
  const simulationResults = {};
  for (let i = 0; i < this.params.numOfSimulations; i++) {
    this._simulateDraft(simulationResults);
  }
  Object.keys(simulationResults).forEach(key => {
    for (let i = 0; i < simulationResults[key].length; i++) {
      let numOfPicks = simulationResults[key][i];
      if (!numOfPicks) numOfPicks = 0;
      simulationResults[key][i] = (numOfPicks / this.params.numOfSimulations) * 100;
    }
  });
  return simulationResults;
};

Model.prototype.assignProbabilities = function() {
  const simulationResults = this._manyDraftSimulations();
  this.modelResults = this.modelResults.map(teamObj => {
    if (simulationResults.hasOwnProperty(teamObj.team)) {
      teamObj.percentages = simulationResults[teamObj.team];
    } else {
      teamObj.percentages = [];
    }
    while (teamObj.percentages.length < this.arrOfTeams.length) {
      teamObj.percentages.push(0);
    }
    return teamObj;
  });
};

Model.prototype._calculateTotalFirstPickCombos = function() {
  this.totalCombos = this.arrOfTeams.reduce((totalCombos, teamObj) => totalCombos + teamObj.combinations, 0);
};

Model.prototype.assignAllFirstPickProbabilities = function() {
  this._calculateTotalFirstPickCombos();
  this.modelResults.forEach(teamObj => { teamObj.firstPickPercentage = (teamObj.combinations / this.totalCombos) * 100; });
};

module.exports = Model;
