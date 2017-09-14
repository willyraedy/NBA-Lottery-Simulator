// let db = require('./dataimport').db;
// let Records = require('./dataimport').Records;
// const createArrOfTeams = require('./utilityFuncs/formatData');
// const addRank = require('./utilityFuncs/addRank');
// const Model = require('./model/Model');

// let defaultCombos = [250, 199, 156, 119, 88, 63, 43, 28, 17, 11, 8, 7, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// let flatCombos = [34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33];

// db.sync()
// .then(() => {
//   return Records.findOne({
//     where: {
//       season: 2005
//     }
//   });
// })
// .then((yearObj) => {
//     const formattedTeamData = addRank(createArrOfTeams(yearObj));
//     const model = new Model('current', formattedTeamData, 1000, defaultCombos, 5);
//     model._assignCombos();
//     model.assignAllFirstPickProbabilities();
//     model.assignProbabilities();
//     return model.modelResults;
// })
// .then(arrOfTeams => {
//   console.log(arrOfTeams.slice(0, 18));
//   console.log('Done');
// })
// .catch(console.error);
