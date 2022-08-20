const express = require('express');
// Construct a router instance.
const router = express.Router();
// const asyncHandler = require('./middleware/async-handler');
const User = require('../models').User;
// const { authenticateUser } = require('./middleware/auth-user');
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
// Route that returns a list of users.
router.get('/users', asyncHandler(async (req, res) => {
  const user = req.currentUser;
  User.findAll()
      res.status(200).json(user);
}));


module.exports = router;
