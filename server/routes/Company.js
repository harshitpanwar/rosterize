// routes

const express = require('express');
const router = express.Router();

const { getCompany, postCompany } = require('../controllers/Company');

router.get('/:company_id', getCompany);
router.post('/', postCompany);

module.exports = router;