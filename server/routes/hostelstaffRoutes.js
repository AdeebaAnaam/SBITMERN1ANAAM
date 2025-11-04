const express = require('express');
const { createHStaff, getHStaffs,  updateHStaff, deleteHStaff } = require('../controllers/hostelstaffController');
const router = express.Router();

router.post('/hstaff', createHStaff);
router.get('/hstaffs', getHStaffs);
router.put('/hstaff/:id', updateHStaff);
router.delete('/hstaff/:id', deleteHStaff);

module.exports = router;