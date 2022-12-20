const express = require('express');
const router = express.Router();
const LastController = require('../controllers/LastController');

router.get('/read', LastController.read);
router.post('/updateLastRapport', LastController.updateLastRapport);
router.post('/updateLastAffaire', LastController.updateLastAffaire);



module.exports = router;