const express = require('express');
const { registerUser, findNearestNurse } = require('../controllers/usercontroller.js'); // Import the correct controller function

const router = express.Router();



router.post('/register', registerUser);
router.post('/find-nearest-nurse', findNearestNurse); // New endpoint

module.exports = router;
