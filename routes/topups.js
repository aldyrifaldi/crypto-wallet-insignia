var express = require('express');
var router = express.Router();
const TopupController = require('../app/controllers/TopupController.js')
const JwtMiddleware = require('../app/middlewares/JwtMiddleware')

// topup balance authenticated user
router.post('/', JwtMiddleware,TopupController.store);

module.exports = router;
