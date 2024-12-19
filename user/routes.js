const express = require('express');
const { createUser,loginUser } = require('../user/controller');

const router = express.Router();

// POST /api/users
router.post('/users', createUser);

//POST /api/login
router.post('/login', loginUser);

module.exports = router;
