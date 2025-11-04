const Faculty = require('../models/Faculty');


// Create a faculty
exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({message: 'Faculty added successfully!', data: faculty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all faculties
exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json({message : 'Faculties fetched successfully!', data: faculties} );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a faculty
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' })
    res.json({ message: 'Faculty updated successfully!', data: faculty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a faculty
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) { return res.status(404).json({ message: 'Faculty not found' }); }
    res.json({ message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};