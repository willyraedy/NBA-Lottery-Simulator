const router = require('express').Router()
const { LotteryModel } = require('../db/models')

module.exports = router

router.post('/', (req, res, next) => {
  const { type, season, numPicks, numSims } = req.body;
  if (type === 'Rank') {
    const { combos } = req.body;
    LotteryModel.findOrCreate({
      where: {
        season,
        numPicks,
        numSims,
        combos
      }
    })
      .then(([createdModel, created]) => {
        console.log(createdModel.id)
        res.json(createdModel.id)
      })
      .catch(next);
  } else if (type === 'Record') {
    const { max, shift, slope } = req.body;
    LotteryModel.findOrCreate({
      where: {
        season,
        numPicks,
        numSims,
        max,
        shift,
        slope
      }
    })
      .then(([createdModel, created]) => res.json(createdModel.id))
      .catch(next);
  } else {
    // error handling
  }
});
