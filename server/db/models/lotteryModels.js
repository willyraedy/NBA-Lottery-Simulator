const Sequelize = require('sequelize');
const db = require('../db');

const RankModels = db.define('lotteryModels', {
  type: {
    type: Sequelize.ENUM('Rank', 'Record'),
    allowNull: false
  },
  season: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numPicks: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numSims: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  combos: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  max: {
    type: Sequelize.FLOAT,
  },
  shift: {
    type: Sequelize.FLOAT,
  },
  slope: {
    type: Sequelize.FLOAT,
  },
});

module.exports = RankModels;

