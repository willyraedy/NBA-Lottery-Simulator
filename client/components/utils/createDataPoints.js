import { logitFunc } from './logitFunc';

export function recordDataPoints(teamRecords, slope, shift, totalGames) {
  return teamRecords.map((teamRecordObj) => {
    const wins = totalGames - teamRecordObj.losses;
    return {
      x: wins,
      y: logitFunc(slope, totalGames, teamRecordObj.losses, shift),
      name: teamRecordObj.teamName,
    };
  });
}

export function rankDataPoints(teamRecords, combos) {
  return teamRecords.map((teamRecordObj, i) => {
    return {
      x: i + 1,
      y: combos[i],
      name: teamRecordObj.teamName,
    };
  });
}
