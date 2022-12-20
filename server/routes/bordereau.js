const express = require('express');
const router = express.Router();
const BordereauController = require('../controllers/BordereauController');

router.post('/create', BordereauController.create);
router.post('/delete', BordereauController.deleteBD);
router.post('/DeleteBDWithoutFilenameBE', BordereauController.DeleteBDWithoutFilenameBE);
router.post('/deleteImportRapportandBE', BordereauController.DeleteImportRapportandBE);
router.get('/readAllBordereaus', BordereauController.readAllBordereaus);
router.get('/getLastBD', BordereauController.getLastBD);
router.get('/displaybe/:be', BordereauController.showBE);

module.exports = router;
