const courseModel = require('../model/course')
const departmentModel = require('../model/department');


exports.createCourse = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { courseCode, title, creditUnits } = req.body;

        const department = await departmentModel.findById(departmentId);
        if (!department) {
            return res.status(400).json({
                message: 'Invalid department.'
            })
        }

        const data = {
            courseCode, 
            title, 
            creditUnits,
            departmentId
        }

        // const newPost = await postModel.create(data);
        const newCourse = new courseModel(data);

        department.courses.push(newCourse._id);
        // Save the Change to Database
        await newCourse.save();
        await department.save();

        res.status(201).json({
            message: 'Course created successfully',
            data: newCourse
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find().populate('departmentId');

        res.status(200).json({
            message: `All courses found and the Total is: ${courses.length}`,
            data: courses
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findById(id).populate('departmentId');

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        res.status(200).json({
            message: `Course found`,
            data: course
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const { courseCode, title, creditUnits } = req.body;

        const course = await courseModel.findById(id);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }



        if (courseCode && courseCode !== course.courseCode) {
            const courseCodeExists = await courseModel.findOne({ courseCode: courseCode.toLowerCase() })
            if (courseCodeExists) {
                return res.status(400).json({
                    message: 'Name already in use'
                })
            }
        }

        const data = {
            courseCode, 
            title, 
            creditUnits
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            message: 'Course updated successfully',
            data: updatedCourse
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteCourse = async ( req, res ) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findById(id);

        if (!course) {
            return res.status(404).json( {
                message: 'course not found'
            } );
        }

        await Department.findByIdAndUpdate(course.department, {$pull: { courses: course._id }});

        await courseModel.findByIdAndDelete(id);

        res.status(200).json( {
            message: 'Course deleted successfully'
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

