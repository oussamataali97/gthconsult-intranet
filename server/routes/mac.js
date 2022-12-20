const express = require('express');
const router = express.Router();
const MacController = require('../controllers/MacController');

router.post('/read', MacController.read);

module.exports = router;