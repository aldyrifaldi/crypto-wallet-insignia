var express = require('express');
var router = express.Router();
const TransferController = require('../app/controllers/TransferController.js');
const JwtMiddleware = require('../app/middlewares/JwtMiddleware')

// transfer balance from authenticated user to other user
router.post('/', JwtMiddleware,TransferController.store);

module.exports = router;
