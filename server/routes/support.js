const express = require('express');
const router = express.Router();
const SupportController = require('../controllers/SupportController');

router.get('/display/:filename', SupportController.Display);

module.exports = router;