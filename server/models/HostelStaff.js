const mongoose = require('mongoose');

const HostelStaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
    salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('HosteltStaff', HostelStaffSchema);