const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'departments',
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
   title: {
        type: String,
        required: true
    },
    creditUnits: {
        type: Number,
        required: true
    },
},  {
    timestamps: true
});

const courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel;