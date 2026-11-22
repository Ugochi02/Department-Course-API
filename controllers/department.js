const departmentModel = require('../model/department.js');


exports.createDepartment = async (req, res) => {
    try {
        const { name, faculty } = req.body;

        const department = await departmentModel.findOne({name});
        if (department) {
            return res.status(400).json({
                message: `Department with name: ${name} already exists`
            })
        }

        const data = {
            name,
            faculty
        }

        const newDepartment = await departmentModel.create(data);

        res.status(201).json({
            message: "Department created successfully",
            data: newDepartment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find().populate('courses');

        res.status(200).json({
            message: `All departments found and the Total is: ${departments.length}`,
            data: departments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneDepartment = async ( req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentModel.findById(id).populate('courses');

        if(!department){
            return res.status(404).json({
                message: "Department not found"
            })
        }
        res.status(200).json({
            message: `Department found`,
            data: department
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, faculty } = req.body;

        const department = await departmentModel.findById(id);
        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            })
        }



        if (name && name !== department.name) {
            const nameExists = await departmentModel.findOne({ name: name.toLowerCase() })
            if (nameExists) {
                return res.status(400).json({
                    message: 'Name already in use'
                })
            }
        }

        const data = {
            name, 
            faculty
        }

        const updatedDepartment = await departmentModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            message: 'Department updated successfully',
            data: updatedDepartment
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteDepartment = async ( req, res ) => {
    try {
        const { id } = req.params;
        const department = await departmentModel.findByPk( id );

        if ( !department ) {
            return res.status( 404 ).json( {
                message: 'department not found'
            } );
        }

        await department.destroy();

        res.status( 200 ).json( {
            message: 'Department deleted successfully'
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

