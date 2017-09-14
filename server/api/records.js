const router = require('express').Router()
const { Record } = require('../db/models')

module.exports = router

router.get('/:season', (req, res, next) =>
  Record.findOne({
    where: {
      season: req.params.season,
    }
  })
    .then(users => res.json(users))
    .catch(next)
);
