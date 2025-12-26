const express = require("express");
const {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");

const {
  verifyToken,
  roleCheck,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ADD faculty → faculty & management
router.post(
  "/faculty",
  verifyToken,
  roleCheck("faculty", "create"),
  createFaculty
);

// VIEW faculty → all roles
router.get(
  "/faculties",
  verifyToken,
  roleCheck("faculty", "read"),
  getFaculties
);

// UPDATE faculty → management only
router.put(
  "/faculty/:id",
  verifyToken,
  roleCheck("faculty", "update"),
  updateFaculty
);

// DELETE faculty → management only
router.delete(
  "/faculty/:id",
  verifyToken,
  roleCheck("faculty", "delete"),
  deleteFaculty
);

module.exports = router;
