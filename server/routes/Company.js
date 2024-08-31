// routes

const express = require('express');
const router = express.Router();

const { getCompany, postCompany, list, updateCompanyStatus, updateCompany} = require('../controllers/Company');
const { checkAuth } = require('../middleware/middleware');

router.get('/list', list);
router.get('/:company_id', getCompany);
router.post('/', postCompany);
router.post('/status', updateCompanyStatus);


module.exports = router;