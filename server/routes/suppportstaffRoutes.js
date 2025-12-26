const express = require("express");
const {
  createSStaff,
  getSStaffs,
  updateSStaff,
  deleteSStaff,
} = require("../controllers/supportstaffController");

const {
  verifyToken,
  roleCheck,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ADD support staff → staff + management
router.post(
  "/sstaff",
  verifyToken,
  roleCheck("staff", "create"),
  createSStaff
);

// VIEW support staff → all roles
router.get(
  "/sstaffs",
  verifyToken,
  roleCheck("staff", "read"),
  getSStaffs
);

// UPDATE support staff → management only
router.put(
  "/sstaff/:id",
  verifyToken,
  roleCheck("staff", "update"),
  updateSStaff
);

// DELETE support staff → management only
router.delete(
  "/sstaff/:id",
  verifyToken,
  roleCheck("staff", "delete"),
  deleteSStaff
);

module.exports = router;
