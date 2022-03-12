var express = require('express');
var router = express.Router();
const LeaderboardController = require('../app/controllers/LeaderboardController.js')
const JwtMiddleware = require('../app/middlewares/JwtMiddleware')

// topup balance authenticated user
router.get('/', JwtMiddleware,LeaderboardController.topTransactionsPerUser);

module.exports = router;
