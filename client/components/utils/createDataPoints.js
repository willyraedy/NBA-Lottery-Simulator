import { logitFunc } from './logitFunc';

export default function createDataPoints(teamRecords, max, slope, shift, totalGames) {
  return teamRecords.map((teamRecordObj) => {
    const wins = totalGames - teamRecordObj.losses;
    return {
      x: wins,
      y: logitFunc(max, slope, totalGames, teamRecordObj.losses, shift),
      name: teamRecordObj.teamName,
    };
  });
}
