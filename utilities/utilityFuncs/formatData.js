function createArrOfTeams(yearObj) {
  let result = [];
  Object.keys(yearObj.dataValues).slice(1).forEach(key => {
    let obj = {
      team: key,
      losses: yearObj[key] || null,
    }
    result.push(obj)
  })
  return result;
}

module.exports = createArrOfTeams;
