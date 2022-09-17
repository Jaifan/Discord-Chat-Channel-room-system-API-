const express = require('express');
const {createUser,loginUser,getAll,deleteAll} = require('../Controllers/auth');
const router = express.Router();

router.route('/register').post(createUser).get(getAll).delete(deleteAll);
router.route('/login').post(loginUser)

module.exports = router