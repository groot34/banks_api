const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController.js');

router.get('/banks', bankController.getBankList);
router.get('/branches/:branch', bankController.getBranchDetails);

module.exports = router;
