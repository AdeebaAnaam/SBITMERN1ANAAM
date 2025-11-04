const SStaff = require('../models/SupportStaff');


// Create a staff
exports.createSStaff = async (req, res) => {
  try {
    const sstaff = new SStaff(req.body);
    await sstaff.save();
    res.status(201).json({ message: 'Support Staff added successfully!', data: sstaff   });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all staffs
exports.getSStaffs = async (req, res) => {
  try {
    const sstaffs = await SStaff.find();
    res.json({ message: 'Support Staff fetched successfully!', data: sstaffs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a staff
exports.updateSStaff = async (req, res) => {
  try {
    const sstaff = await SStaff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sstaff) return res.status(404).json({ message: 'Support Staff not found' })  
    res.json({ message: 'Support Staff updated successfully!', data: sstaff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a staff
exports.deleteSStaff = async (req, res) => {
  try {
   const sstaf= await SStaff.findByIdAndDelete(req.params.id);
   if(!sstaf){return res.status(404).json({ message: 'Support Staff not found' });}
    res.json({ message: 'Support Staff deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};