var express = require('express');
var router = express.Router();
const BalanceController = require('../app/controllers/BalanceController.js')
const JwtMiddleware = require('../app/middlewares/JwtMiddleware')

// read balance authenticated user
router.get('/',BalanceController.index);

module.exports = router;
