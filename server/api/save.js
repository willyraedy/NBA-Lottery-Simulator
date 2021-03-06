const router = require('express').Router()
const { LotteryModel } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  const id = +req.query.id;
  LotteryModel.findById(id)
    .then((modelSpecs) => {
      if (!modelSpecs) {
        res.status(404).send('Saved model not found');
      } else {
        res.json(modelSpecs);
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { type, season, numPicks, numSims, numSeasons } = req.body;
  if (type === 'Rank') {
    const { combos } = req.body;
    LotteryModel.findOrCreate({
      where: {
        type,
        season,
        numPicks,
        numSims,
        combos,
        numSeasons
      }
    })
      .then(([createdModel, created]) => {
        res.json(createdModel.id)
      })
      .catch(next);
  } else if (type === 'Record') {
    const { shift, slope } = req.body;
    LotteryModel.findOrCreate({
      where: {
        type,
        season,
        numPicks,
        numSims,
        shift,
        slope,
        numSeasons
      }
    })
      .then(([createdModel, created]) => res.json(createdModel.id))
      .catch(next);
  } else {
    // error handling
  }
});
