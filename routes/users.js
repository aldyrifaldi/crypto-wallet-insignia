var express = require('express');
var router = express.Router();
const UserController = require('../app/controllers/UserController.js')

/* GET users listing. */
router.post('/', UserController.store);

module.exports = router;
