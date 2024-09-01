const express = require('express');
const router = express.Router();

const { getLeaves, changeLeaveStatus, schedule, addSchedule } = require('../controllers/DepartmentHead');

router.get('/leaves', getLeaves);
router.post('/leave/status/:id', changeLeaveStatus);
router.get('/schedule', schedule);
router.post('/schedule', addSchedule);

module.exports = router;