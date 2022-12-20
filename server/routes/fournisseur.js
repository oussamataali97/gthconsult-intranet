const express = require('express');
const router = express.Router();
const FournisseurController = require("../controllers/FournisseurController");

router.post('/create', FournisseurController.create);
router.post('/update', FournisseurController.update);
router.post('/select', FournisseurController.select);
router.post('/read', FournisseurController.read);
router.post('/delete', FournisseurController.delete);

module.exports = router;