const router = require('express').Router();

module.exports = router;

router.use('/simulate', require('./simulate'));
router.use('/record', require('./records'));
router.use('/save', require('./save'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
