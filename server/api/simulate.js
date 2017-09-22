const router = require('express').Router()
const { Record } = require('../db/models');
const runSimulations = require('../../simulate/runSimulations');

module.exports = router

router.get('/', (req, res, next) => {
  const { type, season, numPicks, numTeams, numSims, combos } = req.query;
  Record.findOne({
    where: {
      season
    }
  })
    .then((seasonData) => {
      res.json(runSimulations(seasonData, numSims, combos, numPicks, type))
    })
    .catch(next);
});
