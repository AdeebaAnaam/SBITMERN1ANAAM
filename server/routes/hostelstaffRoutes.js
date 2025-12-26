const express = require("express");
const {
  createHStaff,
  getHStaffs,
  updateHStaff,
  deleteHStaff,
} = require("../controllers/hostelstaffController");

const {
  verifyToken,
  roleCheck,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ADD hostel staff → staff + management
router.post(
  "/hstaff",
  verifyToken,
  roleCheck("staff", "create"),
  createHStaff
);

// VIEW hostel staff → all roles
router.get(
  "/hstaffs",
  verifyToken,
  roleCheck("staff", "read"),
  getHStaffs
);

// UPDATE hostel staff → management only
router.put(
  "/hstaff/:id",
  verifyToken,
  roleCheck("staff", "update"),
  updateHStaff
);

// DELETE hostel staff → management only
router.delete(
  "/hstaff/:id",
  verifyToken,
  roleCheck("staff", "delete"),
  deleteHStaff
);

module.exports = router;
