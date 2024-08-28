const {me, createUser, list, deleteUser} = require('../controllers/User');

const router = require('express').Router();

router.get('/me', me);
router.post('/create', createUser);
router.get('/list', list);
router.delete('/delete/:user_id', deleteUser);

module.exports = router;