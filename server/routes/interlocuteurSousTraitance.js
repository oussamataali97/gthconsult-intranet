const express = require('express');
const router = express.Router();
const InterlocuteurSousTraitanceController = require("../controllers/InterlocuteurSousTraitanceController");

router.post('/create', InterlocuteurSousTraitanceController.create);
router.post('/update', InterlocuteurSousTraitanceController.update);
router.post('/select', InterlocuteurSousTraitanceController.select);
router.post('/read', InterlocuteurSousTraitanceController.read);
router.post('/delete', InterlocuteurSousTraitanceController.delete);

module.exports = router;