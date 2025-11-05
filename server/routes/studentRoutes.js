const express = require('express');
const { createStudent, getStudents,  updateStudent, deleteStudent } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/student', createStudent);
router.get('/students', getStudents);
router.put('/student/:id', authMiddleware, updateStudent);
router.delete('/student/:id', authMiddleware, deleteStudent);

module.exports = router;