const express = require('express');
const router = express.Router({ mergeParams: true });
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);

router.get('/', activityController.getActivities);

module.exports = router;
