export default function createTeamRecordArr(teamRecords, numSeasons) {
  const totalGames = (numSeasons + 1) * 82;
  const teamRecordArr = [];
  Object.keys(teamRecords).forEach((teamName, i) => {
    const losses = teamRecords[teamName];
    // does team have a record and cut out season
    if (losses && losses < 1000) {
      teamRecordArr.push({
        teamName,
        record: `${totalGames - losses} - ${losses}`,
        losses,
      });
    }
  });
  return teamRecordArr.sort((team1, team2) => team2.losses - team1.losses).slice(0, teamRecordArr.length - 16);
}
