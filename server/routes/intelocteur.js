const express = require('express');
const router = express.Router();
const InterlocuteurController = require('../controllers/InterlocuteurController');

router.post('/create', InterlocuteurController.create);
router.get('/read', InterlocuteurController.read);
router.post('/get', InterlocuteurController.get);
router.post('/update', InterlocuteurController.update);
router.post('/delete', InterlocuteurController.delete);
router.post('/select', InterlocuteurController.select);
router.post('/sendEmailInterlocuteur', InterlocuteurController.send);
router.post('/valideInterlocuteur', InterlocuteurController.valideInterlocuteur);
router.post('/invalideInterlocuteur', InterlocuteurController.InvalideInterlocuteur);


module.exports = router;
