const express = require('express');
const router = express.Router();
const InterventionController = require('../controllers/InterventionController');

router.post('/create', InterventionController.create);
router.post('/deleteIntervention', InterventionController.DeleteIntervention);
router.post('/indicateur', InterventionController.Indicateur);

module.exports = router;