const router = require('express').Router()
const { Record } = require('../db/models');
const runSimulations = require('../../simulate/runSimulations');

module.exports = router

router.get('/', (req, res, next) => {
  const { type, season, numPicks, numSims, combos, max, shift, slope } = req.query;
  Record.findOne({
    where: {
      season
    }
  })
    .then((seasonData) => {
      res.json(runSimulations({ season: seasonData, numSims, combos, numPicks, type, max, shift, slope }));
    })
    .catch(next);
});
