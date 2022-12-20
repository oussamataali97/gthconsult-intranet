const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');

router.post('/enregistrerRapportClass', ClassController.EnregistrerRapportClass);
router.post('/readClassAffaire', ClassController.ReadClassAffaire);
router.post('/effacerClassAffaire', ClassController.EffacerClassAffaire);
router.post('/enregistrerClassRapport', ClassController.EnregistrerClassRapport);
router.post('/deleteClassRapport', ClassController.DeleteClassRapport);
router.post('/enregistrerClassShema', ClassController.EnregistrerClassShema);
router.post('/deleteClassShema', ClassController.DeleteClassShema);

module.exports = router;