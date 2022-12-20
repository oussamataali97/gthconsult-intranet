const express = require('express');
const router = express.Router();
const FraiController = require('../controllers/FraiController');

router.post('/valider', FraiController.Valider);
router.post('/checkmoisvalider', FraiController.CheckMoisValider);
router.post('/read', FraiController.Read);
router.get('/generatexslx/:fraiId', FraiController.GenerateXSLX);
router.get('/generateword/:fraiId/:nom/:prenom', FraiController.GenerateWORD);
router.post('/validerh', FraiController.validRH);
router.post('/validedir', FraiController.validDIR);
router.post('/paiment', FraiController.Paiment);
router.post('/supprimerpaiment', FraiController.SupprimerPaiment);
router.post('/paimentdate', FraiController.PaimentDate);
router.post('/supprimerfrais', FraiController.SupprimerFrais);

module.exports = router;
