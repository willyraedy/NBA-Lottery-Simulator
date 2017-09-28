export default function createTeamRecordArr(teamRecords, numSeasons) {
  const totalGames = (numSeasons + 1) * 82;
  const teamRecordArr = [];
  Object.keys(teamRecords).forEach((teamName, i) => {
    const losses = teamRecords[teamName];
    if (i) {
      teamRecordArr.push({
        teamName,
        record: `${totalGames - losses} - ${losses}`,
        // what year did they start playing 82 games???????
        losses,
      });
    }
  });
  return teamRecordArr.sort((team1, team2) => team2.losses - team1.losses).slice(0, 14);
}
