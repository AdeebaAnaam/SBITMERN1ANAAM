const express = require('express');
const { createMamagement, getManagements, updateManagement, deleteManagement, createManagement } = require('../controllers/managementController');
const router = express.Router();

router.post('/management', createManagement);
router.get('/managements', getManagements);
router.put('/management/:id', updateManagement);
router.delete('/management/:id', deleteManagement);

module.exports = router;