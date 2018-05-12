const express = require('express');
const router = express.Router();

// Require controller modules.
const company = require('../controllers/companyRegisterController');
/// Company ROUTES ///

// GET catalog home page.
router.get('/', company.company_list);

// POST request for creating Book.
router.post('/create', company.company_create_post);

module.exports = router;