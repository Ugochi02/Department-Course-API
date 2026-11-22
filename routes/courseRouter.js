const router = require('express').Router();
const { createCourseValidation } = require('../validation/courseValidation');
const { createCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse } = require('../controllers/course');

router.post('/createCourse/:userId', createCourseValidation, createCourse)

router.get('/allCourses', getAllCourses);

router.get('/getOneCourse/:id', getOneCourse)

router.patch('/updateCourse/:id', updateCourse);

router.delete('/deleteCourse/:id', deleteCourse)

module.exports = router;
