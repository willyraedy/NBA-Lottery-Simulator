const router = require('express').Router()
const { Record } = require('../db/models');
const runSimulations = require('../../simulate/runSimulations');

module.exports = router

router.get('/', (req, res, next) => {
  const { type, season, numPicks, numSims, combos, shift, slope, numSeasons } = req.query;
  Record.findOne({
    where: {
      season
    }
  })
    .then(record => record.aggregateSeasons(numSeasons))
    .then((seasonData) => {
      res.json(runSimulations({ season: seasonData, numSims, combos, numPicks, type, shift, slope, numSeasons }));
    })
    .catch(next);
});
