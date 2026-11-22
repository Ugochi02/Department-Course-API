const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   faculty: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'courses'
    }]
},  {
    timestamps: true
});

const departmentModel = mongoose.model('departments', departmentSchema);

module.exports = departmentModel;