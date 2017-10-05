function createArrOfTeams(yearObj) {
  const result = [];
  let arr = [];

  // scrub different yearObj depending on aggregated seasons or single season
  if (yearObj.dataValues) arr = Object.keys(yearObj.dataValues);
  else arr = Object.keys(yearObj);

  arr.slice(1).forEach((key) => {
    const obj = {
      team: key,
      losses: yearObj[key] || null,
    };
    result.push(obj);
  });
  return result;
}

module.exports = createArrOfTeams;
