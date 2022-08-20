'use strict';
​
const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
​
// Construct a router instance.
const router = express.Router();
​
// Route that returns a list of users.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  user.findAll()
      res.status(200).json(user);
}));
​
module.exports = router;
