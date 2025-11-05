const express = require('express');
const { createSStaff, getSStaffs,  updateSStaff, deleteSStaff } = require('../controllers/supportstaffController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/sstaff', createSStaff);
router.get('/sstaffs', getSStaffs);
router.put('/sstaff/:id', authMiddleware,  updateSStaff);
router.delete('/sstaff/:id', authMiddleware, deleteSStaff);

module.exports = router;