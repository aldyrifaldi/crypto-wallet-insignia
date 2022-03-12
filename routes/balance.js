var express = require('express');
var router = express.Router();
const BalanceController = require('../app/controllers/BalanceController.js')
const JwtMiddleware = require('../app/middlewares/JwtMiddleware')

// topup balance authenticated user
router.get('/', JwtMiddleware,BalanceController.index);

module.exports = router;
