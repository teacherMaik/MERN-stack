const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    console.log("Enter protect if");
    try {

      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from Token withour the password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      
      console.log(error);

      // 401 means not authorized
      res.status(401);
      throw new Error('Not authorized');
    }
  } else if (!token) {

    res.status(401);
    throw new Error('Not authorized, no token');
  }

});

module.exports = { protect };