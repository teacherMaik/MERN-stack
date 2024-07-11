const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Gets all Goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler( async (req, res) => {

  const goals = await Goal.find( {user: req.user.id} );

  if (!req.body.text) {

    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json(goals);
});

//@desc Create a new gola
//@route POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {

  if (!req.body.text) {

    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
});

//@desc Updates a goal with given id
//@route PUT /api/goal/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  // check for user then check to see if logged in user matches goal user
  if (!user) {

    res.status(401);
    throw new Error('User not found');
  } else if (goal.user.toString() !== user.id) {

    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

//@desc Deletes a goal with given id
//@route DELETE /api/goal/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  // check for user then check to see if logged in user matches goal user
  if (!user) {

    res.status(401);
    throw new Error('User not found');
  } else if (goal.user.toString() !== user.id) {

    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.deleteOne();

  res.status(200).json(req.params.id);
});



module.exports = {
  getGoals, setGoal, updateGoal, deleteGoal
};