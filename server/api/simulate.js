const router = require('express').Router()
const { Record } = require('../db/models');
const simulate = require('../../utilities/app');

module.exports = router

router.get('/', (req, res, next) => {
  const { type, season, numPicks, numTeams, numSims } = req.query;
  Record.findOne({
    where: {
      season
    }
  })
    .then(seasonData => res.json(simulate(seasonData, numSims, 'current', numPicks)))
    .catch(next);
});
