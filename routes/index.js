var router = require('express').Router();

router.use('/wiki', require('./wiki'));
router.use('/users', require('./user'));

module.exports = router;