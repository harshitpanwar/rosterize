const {me, createUser, getUser, updateUser, searchUser, list, deleteUser, clockin, clockout, 
    getclockInOutStatus, getClockInFromToDate, setStatus, getStatus, 
    applyLeave, getAllStatusMessages, submitReview, dashboard} = require('../controllers/User');

const router = require('express').Router();

router.get('/me', me);
router.post('/create', createUser);
router.get('/get/:user_id', getUser);
router.post('/update/:user_id', updateUser);
router.get('/search', searchUser);
router.get('/list', list);
router.delete('/delete/:user_id', deleteUser);
router.post('/clockin', clockin);
router.post('/clockout', clockout);
router.get('/loginstatus', getclockInOutStatus);
router.get('/getclockinfromtodate', getClockInFromToDate);
router.get('/getstatus', getStatus);
router.post('/setstatus', setStatus);
router.post('/applyleave', applyLeave);
router.get('/getallstatusmessages', getAllStatusMessages);
router.post('/submitreview', submitReview);
router.get('/dashboard', dashboard);

module.exports = router;