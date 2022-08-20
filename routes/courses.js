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

module.exports = router;