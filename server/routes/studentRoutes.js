const express = require("express");
const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const {
  verifyToken,
  roleCheck,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ADD student → student & management
router.post(
  "/student",
  verifyToken,
  roleCheck("student", "create"),
  createStudent
);

// VIEW students → all roles
router.get(
  "/students",
  verifyToken,
  roleCheck("student", "read"),
  getStudents
);

// UPDATE student → faculty & management
router.put(
  "/student/:id",
  verifyToken,
  roleCheck("student", "update"),
  updateStudent
);

// DELETE student → faculty & management
router.delete(
  "/student/:id",
  verifyToken,
  roleCheck("student", "delete"),
  deleteStudent
);

module.exports = router;
