const express = require('express');
const router = express.Router();
const MissionController = require('../controllers/MissionController');

router.post('/create', MissionController.create);
router.get('/read', MissionController.read);
router.put('/update/:mid', MissionController.update);
router.delete('/delete/:mid/:countRapport', MissionController.delete);
router.delete('/deleteaffairenotcomplete/:mid', MissionController.deleteAffaireNotComplete);
router.get('/getMission/:mid', MissionController.getMission);
router.post('/send/:mid', MissionController.send);
router.post('/annulerAffaireAfterCreateMission', MissionController.AnnulerAffaireAfterCreateMission);


module.exports = router;
