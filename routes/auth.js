const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');
const protected = require('../middleware/auth');

/// Auth User ROUTES ///

/**
 * Check user name availability
 * @method: GET
 * @prams: username
 */ 

router.get('/check-user-name/:username', auth_controller.check_username_availability);

/**
 * Check user email availability
 * @method: GET
 * @prams: email
 */ 
router.get('/check-email/:email', auth_controller.check_email_availability);

router.get('/profile', protected, auth_controller.profile);


/**
 * User Register
 * Method: POST
 */
router.post('/register', auth_controller.register);

/**
 * User Login
 * Method: POST
 */  
router.post('/login', auth_controller.login);

module.exports = router;