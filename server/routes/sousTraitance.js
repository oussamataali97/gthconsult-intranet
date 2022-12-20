const express = require('express');
const router = express.Router();
const SousTraitanceController = require("../controllers/SousTraitanceController");

router.post('/create', SousTraitanceController.create);
router.post('/update', SousTraitanceController.update);
router.post('/select', SousTraitanceController.select);
router.post('/read', SousTraitanceController.read);
router.post('/delete', SousTraitanceController.delete);

module.exports = router;