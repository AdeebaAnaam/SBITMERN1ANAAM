const HStaff = require('../models/HostelStaff');


// Create a staff
exports.createHStaff = async (req, res) => {
  try {
    const hstaff = new HStaff(req.body);
    await hstaff.save();
    res.status(201).json({ message: 'Hostel Staff added successfully!', data: hstaff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all staffs
exports.getHStaffs = async (req, res) => {
  try {
    const hstaffs = await HStaff.find();
    res.json({ message: 'Hostel Staff fetched successfully!', data: hstaffs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a staff
exports.updateHStaff = async (req, res) => {
  try {
    const hstaff = await HStaff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
     });
     if (!hstaff) return res.status(404).json({ message: 'Hostel Staff not found' })
    res.json({ message: 'Hostel Staff updated successfully!', data: hstaff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a staff
exports.deleteHStaff = async (req, res) => {
  try {
   const hstaff= await HStaff.findByIdAndDelete(req.params.id);
   if (!hstaff){ return res.status(404).json({ message: 'Hostel Staff not found' });
  }
    res.json({ message: ' Hostel Staff deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};