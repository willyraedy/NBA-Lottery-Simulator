export default function createDataPoints(teamRecords, max, slope, shift) {
  return teamRecords.map((teamRecordObj) => {
    const wins = 82 - teamRecordObj.losses;
    return {
      x: wins,
      y: max * (1 / (1 + Math.exp((slope * wins) - shift))),
      name: teamRecordObj.teamName,
    };
  });
}
