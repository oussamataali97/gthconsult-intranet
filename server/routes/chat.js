const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');


router.post('/create', ChatController.create);


module.exports = router;