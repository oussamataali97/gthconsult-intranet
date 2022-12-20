const express = require('express');
const router = express.Router();
const ChatContentController = require('../controllers/ChatContentController');


router.post('/create', ChatContentController.create);


module.exports = router;