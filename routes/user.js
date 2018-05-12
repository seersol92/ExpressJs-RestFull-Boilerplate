const express = require('express');
const router = express.Router();
//access token middle ware
// Require controller modules.
const user_controller = require('../controllers/userController');
/// User ROUTES ///

// GET User List.
router.get('/', user_controller.user_list);

// Get User by id
router.get('/get-user/:id', user_controller.get_user_by_id);

// POST request for user.
router.post('/create', user_controller.create_user);

// POST request for update.
router.post('/update', user_controller.user_update);

// POST request for deleting
router.post('/delete', user_controller.user_delete_post);

module.exports = router;