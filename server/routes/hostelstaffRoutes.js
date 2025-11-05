const express = require('express');
const { createHStaff, getHStaffs,  updateHStaff, deleteHStaff } = require('../controllers/hostelstaffController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/hstaff', createHStaff);
router.get('/hstaffs', getHStaffs);
router.put('/hstaff/:id', authMiddleware,  updateHStaff);
router.delete('/hstaff/:id', authMiddleware, deleteHStaff);

module.exports = router;