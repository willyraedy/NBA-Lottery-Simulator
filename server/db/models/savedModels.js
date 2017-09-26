const Sequelize = require('sequelize');
const db = require('../db');

const Records = db.define('records', {
  season: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
});

Records.removeAttribute('createdAt');
Records.removeAttribute('updatedAt');

module.exports = Records;
