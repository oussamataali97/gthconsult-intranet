const express = require('express');
const router = express.Router();
const FactureController = require('../controllers/FactureController');

router.post('/create', FactureController.create);
router.post('/indicateur', FactureController.Indicateur);
router.get('/readAllFactures', FactureController.readAllFactures);
router.get('/getLastFACTURE', FactureController.getLastFACTURE);
router.get('/displayfacture/:facture', FactureController.showFACTURE);

module.exports = router;
