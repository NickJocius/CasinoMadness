const express = require('express');
const router = express.Router();

// middleware
const { authCheck } = require('../middleware/auth');

// controller
const { createOrUpdateProfile, currentProfile, updateProfile } = require('../controllers/profile');

router.post('/create-or-update-profile', authCheck, createOrUpdateProfile);

router.post('/current-profile', authCheck, currentProfile);

router.put('/update-profile/:_id', authCheck, updateProfile);


module.exports = router;