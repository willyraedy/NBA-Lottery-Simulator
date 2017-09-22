function createArrOfTeams(yearObj) {
  const result = [];
  Object.keys(yearObj.dataValues).slice(1).forEach((key) => {
    const obj = {
      team: key,
      losses: yearObj[key] || null,
    };
    result.push(obj)
  });
  return result;
}

module.exports = createArrOfTeams;
