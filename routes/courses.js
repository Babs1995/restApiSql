const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
// global async function to catch errors in each route
function asyncHandler (cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
}
// Route that returns a list of courses
router.get('/courses', asyncHandler(async (req, res) => {
    const course = req.currentCourse;
    Course.findAll()
        res.status(200).json(course);
}));
// Route that returns a single course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = req.currentCourse;
    Course.findOne()
        res.status(200).json(course);
}));
// // Route that creates a new course
// post method
router.post('/courses', asyncHandler(async (req, res) => {
    try {
      // declaring user and returning 201 status 
     const course = await Course.create(req.body);
     res.status(201).location("/courses/"+"course.id").json(course).end();
   } catch (error) {
     if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
       const errors = error.errors.map(err => err.message);
       res.status(400).json({ errors });   
     } else {
       throw error;
     }
   }
 }));

router.post('/courses/:id', asyncHandler(async (req, res) => {
    const course = req.currentCourse;
    Course.create(req.body)
        res.status(201).json(course);
}));


module.exports = router;