const Sequelize = require('sequelize');
const db = require('../db');
const mergeWith = require('lodash.mergewith');

const Records = db.define('records', {
  season: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  atlanta: Sequelize.INTEGER,
  boston: Sequelize.INTEGER,
  brooklyn: Sequelize.INTEGER,
  charlotte: Sequelize.INTEGER,
  chicago: Sequelize.INTEGER,
  cleveland: Sequelize.INTEGER,
  dallas: Sequelize.INTEGER,
  denver: Sequelize.INTEGER,
  detroit: Sequelize.INTEGER,
  gsw: Sequelize.INTEGER,
  houston: Sequelize.INTEGER,
  indiana: Sequelize.INTEGER,
  lac: Sequelize.INTEGER,
  lal: Sequelize.INTEGER,
  memphis: Sequelize.INTEGER,
  miami: Sequelize.INTEGER,
  milwaukee: Sequelize.INTEGER,
  minnesota: Sequelize.INTEGER,
  neworleans: Sequelize.INTEGER,
  newyork: Sequelize.INTEGER,
  oklahoma: Sequelize.INTEGER,
  orlando: Sequelize.INTEGER,
  philadelphia: Sequelize.INTEGER,
  phoenix: Sequelize.INTEGER,
  portland: Sequelize.INTEGER,
  sacramento: Sequelize.INTEGER,
  sanantonio: Sequelize.INTEGER,
  toronto: Sequelize.INTEGER,
  utah: Sequelize.INTEGER,
  washington: Sequelize.INTEGER,
});

Records.prototype.aggregateSeasons = function (numPrevSeasons) {
  if (!numPrevSeasons) return this;
  const instanceCopy = Object.assign({}, this.dataValues);
  const promises = [];
  for (let i = 1; i <= numPrevSeasons; i++) {
    const promise = Records.findOne({
      where: {
        season: instanceCopy.season - i
      }
    });
    promises.push(promise);
  }
  return Promise.all(promises)
    .then((seasonArr) => {
      return seasonArr.map(instance => instance.dataValues)
    })
    .then(seasonCopies => mergeWith(instanceCopy, ...seasonCopies, (objValue, srcValue) => {
      if (objValue < 1000) {
        return objValue + srcValue;
      }
      return objValue;
    }));
};

Records.removeAttribute('createdAt');
Records.removeAttribute('updatedAt');

module.exports = Records;
