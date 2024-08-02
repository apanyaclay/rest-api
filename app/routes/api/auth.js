const express = require('express'),
path = require('path'),
router = express.Router()
const {register} = require('../../middlewares/auth'),
{create} = require('../../controllers/auth')

router.post('/register', register, create);

module.exports = router