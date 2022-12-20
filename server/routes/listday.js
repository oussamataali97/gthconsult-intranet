const express = require('express');
const router = express.Router();
const ListdayController = require('../controllers/ListdayController');

router.post('/sauvgarder', ListdayController.Sauvgarder);
router.post('/changer', ListdayController.Changer);
router.post('/selectMois', ListdayController.SelectMois);


module.exports = router;