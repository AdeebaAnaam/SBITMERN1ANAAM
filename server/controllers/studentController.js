const Student = require('../models/Student');


// Create a student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added successfully!', data: student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ message: 'Students fetched successfully!', data: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
     if (!student) return res.status(404).json({ message: 'Student not found' })
    res.json({ message: 'Student updated successfully!', data: student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
   const student = await Student.findByIdAndDelete(req.params.id);
        if (!student){ return res.status(404).json({ message: 'Student not found' });
  }
    res.json({ message: 'Student deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
