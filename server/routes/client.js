const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

router.post('/create', ClientController.create);
router.get('/reference', ClientController.reference);
router.get('/read', ClientController.read);
router.put('/update/:cid', ClientController.update);
router.post('/delete', ClientController.delete);
router.get('/select/:cid', ClientController.select);
router.get('/select/interlocuteurs/:cid', ClientController.selectInterlocuteurs);
router.post('/send/:cid', ClientController.send);


module.exports = router;
