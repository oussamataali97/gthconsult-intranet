const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/login', AdminController.login)
router.get('/read', AdminController.read)
router.post('/get', AdminController.getAdmin)
router.post('/online', AdminController.Online)
router.post('/rejectonline', AdminController.rejectOnline)
router.post('/checkNotificationFrais', AdminController.checkNotificationFrais)
router.post('/deleteCheckNotificationFrais', AdminController.deleteCheckNotificationFrais)
router.post('/checkNotificationCalendrier', AdminController.checkNotificationCalendrier)
router.post('/deleteCheckNotificationCalendrier', AdminController.deleteCheckNotificationCalendrier)

module.exports = router;