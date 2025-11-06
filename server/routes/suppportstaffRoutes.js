const express = require('express');
const { createSStaff, getSStaffs,  updateSStaff, deleteSStaff } = require('../controllers/supportstaffController');
const router = express.Router();

router.post('/sstaff', createSStaff);
router.get('/sstaffs', getSStaffs);
router.put('/sstaff/:id',   updateSStaff);
router.delete('/sstaff/:id',  deleteSStaff);

module.exports = router;