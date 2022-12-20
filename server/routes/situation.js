const express = require('express');
const router = express.Router();
const SituationSalarieController = require("../controllers/SituationSalarieController");


router.post('/create', SituationSalarieController.create);
router.post('/read', SituationSalarieController.read);
router.post('/delete', SituationSalarieController.delete);
router.get('/telecharger/:inspecteur/:annee', SituationSalarieController.telecharger);


module.exports = router;