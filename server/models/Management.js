const mongoose = require('mongoose');

const ManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },      
    designation: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model( 'Management', ManagementSchema);