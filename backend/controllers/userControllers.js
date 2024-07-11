const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc Creates a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {

    res.status(400);
    throw new Error('Please add all fields');
  } else if (await User.findOne({ email })) {

    res.status(400);
    throw new Error('User already exists');
  }

  // Has password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      emaIl: newUser.email,
      token: generateToken(newUser._id),
    });
  };
});

//@desc Authenticate login user
//@route POST /api/users/login
//@access Public 
const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // search for user with unique email value
  const user = await User.findOne({ email });

  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
  
});

//@desc Get user Data
//@route GET /api/users/me
//@access Public 
const getMe = asyncHandler(async (req, res) => {

  res.status(200).json({ message: 'user data user' });
});

// Generate JWT
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  );
};


module.exports = {
  registerUser,
  loginUser,
  getMe,
};
