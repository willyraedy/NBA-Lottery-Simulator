const router = require('express').Router()
const { Record } = require('../db/models');
const runSimulations = require('../../simulate/runSimulations');
const sanatizeValues = require('./utils/sanatizeValues');

module.exports = router;

router.get('/', (req, res, next) => {
  try {
    const { season, numSims, combos, numPicks, type, shift, slope, numSeasons } = sanatizeValues(req.query);
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
  } catch (err) {
    next(err);
  }
});
