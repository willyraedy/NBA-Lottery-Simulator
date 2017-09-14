function adjustTies(arrOfTeams, originalCombos) {
  let adjustedCombos = originalCombos;

  for (var curRank = 1; curRank <= originalCombos.length; curRank++) {
    let numberOfTiedTeams = 0;
    arrOfTeams.forEach(team => {
      if (team.rank === curRank) numberOfTiedTeams++;
    });

    if (numberOfTiedTeams > 1) {
      let curIdx = curRank - 1;
      let lastIdx = curIdx + numberOfTiedTeams;
      let totalCombosForAllTiedTeams = adjustedCombos.slice(curIdx, lastIdx)
        .reduce((a, b) => a + b);
      adjustedCombos[curIdx] = [totalCombosForAllTiedTeams, numberOfTiedTeams];
    }
  }
  return adjustedCombos;
}

function assignCombo (team, combos) {
  if (!team.rank) {
    team.combinations = null;
  }
  else if (Array.isArray(combos[team.rank - 1])) {
    let [totalCombosRemaining, numberOfTiedTeamsRemaining] = combos[team.rank - 1];
    team.combinations = Math.ceil(totalCombosRemaining / numberOfTiedTeamsRemaining);
    combos[team.rank - 1] = [totalCombosRemaining - team.combinations, --numberOfTiedTeamsRemaining];
  } else {
    team.combinations = combos[team.rank - 1] || 0;
  }
  return team;
}

function assignAllCombos (arrOfTeams, originalCombos) {
  const specificCombos = adjustTies(arrOfTeams, originalCombos);
  return arrOfTeams.map(team => assignCombo(team, specificCombos));
}

module.exports = assignAllCombos;
