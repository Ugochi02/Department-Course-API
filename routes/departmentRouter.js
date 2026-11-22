const router = require('express').Router();
const { createDepartmentValidation } = require('../validation/departmentValidation');
const { createDepartment, getAllDepartments, getOneDepartment, updateDepartment, deleteDepartment } = require('../controllers/department')

router.post('/createDepartment', createDepartmentValidation, createDepartment);

router.get('/allDepartments', getAllDepartments);

router.get('/oneDepartment/:id', getOneDepartment);

router.patch('/updateDepartment/:id', updateDepartment);

router.delete('/deleteDepartment/:id', deleteDepartment)
module.exports = router