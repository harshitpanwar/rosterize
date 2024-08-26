const {me} = require('../controllers/User');

const router = require('express').Router();

router.get('/me', me);

module.exports = router;