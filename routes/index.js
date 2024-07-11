const express = require('express');
const createRecord = require('../controllers/createRecord');
const updateRecord = require('../controllers/updateRecord');
const validateRecord = require('../middleware/validateRecord');
const averageGrades = require('../middleware/averageGrades');

const router = express.Router();

router.post('/', validateRecord, averageGrades, createRecord);
router.put('/:stdNumber', validateRecord, averageGrades, updateRecord);

module.exports = router;
