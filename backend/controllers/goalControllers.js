const asyncHandler = require('express-async-handler');

//@desc Gets all Goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler( async (req, res) => {

  if (!req.body.test) {

    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json({message: 'Get Goals'})
});

//@desc Create a new gola
//@route POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {

  res.status(200).json({message: 'Set new Goal'})
});

//@desc Updates a goal with given id
//@route PUT /api/goal/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {

  res.status(200).json({message: `Update goal ${req.params.id}`});
});

//@desc Deletes a goal with given id
//@route DELETE /api/goal/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {

  res.status(200).json({message: `Delete goal ${req.params.id}`});
});



module.exports = {
  getGoals, setGoal, updateGoal, deleteGoal
};