const express = require('express');
const router = express.Router();
const CalendrierController = require('../controllers/CalendrierController');

router.post('/sauvgardercalendrier', CalendrierController.sauvgarderCalendrier);
router.post('/read', CalendrierController.Read);
router.post('/readInspecteur', CalendrierController.ReadInspecteur);
router.post('/selectMoisDaysAnnee', CalendrierController.SelectMoisDaysAnnee);
router.post('/delete', CalendrierController.DeleteCalendrier);
router.post('/validercalendrier', CalendrierController.ValiderCalendrier);
router.post('/telechargeragenda', CalendrierController.TelechargerAgenda);

module.exports = router;