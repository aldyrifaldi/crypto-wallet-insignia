var express = require('express');
var router = express.Router();
const UserController = require('../app/controllers/UserController.js')

// create user 
router.post('/', UserController.store);

module.exports = router;
