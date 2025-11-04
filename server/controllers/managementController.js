const Management = require('../models/Management');


// Create a management
exports.createManagement = async (req, res) => {
  try {
    const management = new Management(req.body);
    await management.save();
    res.status(201).json({ message: 'Management added successfully!', data: management });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all managements
exports.getManagements = async (req, res) => {
  try {
    const managements = await Management.find();
    res.json({message: 'Managements fetched successfully!', data: managements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a management
exports.updateManagement = async (req, res) => {
  try {
    const management = await Management.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!management) return res.status(404).json({ message: 'Management not found' })
    res.json({ message: 'Management updated successfully!', data: management });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a management
exports.deleteManagement = async (req, res) => {
  try {
   const management= await Management.findByIdAndDelete(req.params.id);
   if (!management){ return res.status(404).json({ message: 'Management not found' });
  }
    res.json({ message: 'Management deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};