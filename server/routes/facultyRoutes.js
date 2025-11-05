const express = require('express');
const { createFaculty, getFaculties, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/faculty', createFaculty);
router.get('/faculties', getFaculties);
router.put('/faculty/:id', authMiddleware, updateFaculty);
router.delete('/faculty/:id', authMiddleware, deleteFaculty);

module.exports = router;