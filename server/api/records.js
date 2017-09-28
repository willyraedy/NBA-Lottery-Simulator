const router = require('express').Router()
const { Record } = require('../db/models')

module.exports = router

router.get('/:season', (req, res, next) => {
  const { numSeasons } = req.query;
  const { season } = req.params;
  return Record.findOne({
    where: {
      season
    }
  })
    .then(record => record.aggregateSeasons(numSeasons))
    .then(aggregatedRecords => res.json(aggregatedRecords))
    .catch(next)
});

