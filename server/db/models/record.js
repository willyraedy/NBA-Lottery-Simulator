const Sequelize = require('sequelize');
const db = require('../db');
const mergeWith = require('lodash.mergewith');

const Records = db.define('records', {
  season: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ATL: Sequelize.INTEGER,
  BOS: Sequelize.INTEGER,
  BKN: Sequelize.INTEGER,
  CHA: Sequelize.INTEGER,
  CHI: Sequelize.INTEGER,
  CLE: Sequelize.INTEGER,
  DAL: Sequelize.INTEGER,
  DEN: Sequelize.INTEGER,
  DET: Sequelize.INTEGER,
  GSW: Sequelize.INTEGER,
  HOU: Sequelize.INTEGER,
  IND: Sequelize.INTEGER,
  LAC: Sequelize.INTEGER,
  LAL: Sequelize.INTEGER,
  MEM: Sequelize.INTEGER,
  MIA: Sequelize.INTEGER,
  MIL: Sequelize.INTEGER,
  MIN: Sequelize.INTEGER,
  NOP: Sequelize.INTEGER,
  NYK: Sequelize.INTEGER,
  OKC: Sequelize.INTEGER,
  ORL: Sequelize.INTEGER,
  PHI: Sequelize.INTEGER,
  PHX: Sequelize.INTEGER,
  PDX: Sequelize.INTEGER,
  SAC: Sequelize.INTEGER,
  SAS: Sequelize.INTEGER,
  TOR: Sequelize.INTEGER,
  UTA: Sequelize.INTEGER,
  WAS: Sequelize.INTEGER,
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

// COPY records FROM '/Users/willyraedy/Documents/NBALotterySim/NBAseedData.csv' DELIMITER ',' CSV;
