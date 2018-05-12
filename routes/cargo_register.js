const express = require('express');
const router = express.Router();

// Require controller modules.
const cargo_controller = require('../controllers/cargoRegisterController');
/// CARGO QUOTE ROUTES ///

// GET catalog home page.
router.get('/', cargo_controller.cargo_list);

// POST request for creating Book.
router.post('/create', cargo_controller.cargo_create_post);

module.exports = router;