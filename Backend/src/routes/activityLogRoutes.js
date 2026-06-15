const express = require('express');
const { getActivityLogs } = require('../controllers/activityLogController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, getActivityLogs);

module.exports = router;
