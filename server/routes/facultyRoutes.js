const express = require('express');
const { createFaculty, getFaculties, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const router = express.Router();

router.post('/faculty', createFaculty);
router.get('/faculties', getFaculties);
router.put('/faculty/:id',  updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

module.exports = router;