const express = require('express');
const router = express.Router();

const { getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalControllers')

const { protect } = require('../middleware/authMiddleware');


// Simplified code  as we use the same routes twice
router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

/* router.get('/', getGoals);
router.post('/', setGoal);

router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal); */

module.exports = router;