const express = require('express');
const router = express.Router();
const Conge = require('../models/Conge');
const CongeController = require('../controllers/CongeController');
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_NAME,
} = require("../config");
const spacesEndpoint = new AWS.Endpoint(DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
});
// specfique Size File
var maxSize = 1000000 * 90;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: DO_SPACES_NAME,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (request, file, cb) => {
      cb(null, `gth-conge-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});

router.post('/selectCongeAdmin', CongeController.selectCongeAdmin);
router.get('/read', CongeController.readConges);
router.get('/display/:filename', CongeController.displayAbsence);
router.post('/delete', CongeController.deleteAbsence);
router.post('/valide', CongeController.valideAbsence);
router.post('/invalide', CongeController.invalideAbsence);

router.post('/create', upload.single("file"), async (req, res) => {

    const { adminId } = req.body;
    const today = new Date();
    const conge = await Conge.findOne({ adminId : adminId});




    var location
    var key

    if(req.file == undefined){
      location = null;
      key = null;

    }else {
      location = req.file.location;
      key = req.file.key;
    }



    if(conge == null) {

      var ts = Date.now();
      var date_ob = new Date(ts);

      const history = {

        _id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
        adminId: adminId,
        date: date_ob,
        nom: req.body.nom,
        prenom: req.body.prenom,
        fonction: req.body.fonction,
        departement: req.body.departement,
        typeAbsence: req.body.typeAbsence,
        motif: req.body.motif,
        dateDebutConge: req.body.dateDebutConge,
        dateFinConge: req.body.dateFinConge,
        nomberJours: parseFloat(req.body.nomberJours),
        nomberJoursOuvrables: parseFloat(req.body.nomberJoursOuvrables),
        location : location,
        key : key,
        status : false,
        reset : parseFloat(req.body.nomberJoursOuvrables) - parseFloat(req.body.nomberJours),
        year : today.getFullYear()

      }

          await Conge({
            adminId:  adminId,
            history : history
          }).save()
          .then((result) => {
              console.log(result)
          })
          .catch((error) => {
              console.log(error.message)
          })

    } else {
      var ts = Date.now();
      var date_ob = new Date(ts);

        const history = {

          _id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          adminId : adminId,
          date: date_ob,
          nom: req.body.nom,
          prenom: req.body.prenom,
          fonction: req.body.fonction,
          departement: req.body.departement,
          typeAbsence: req.body.typeAbsence,
          motif: req.body.motif,
          dateDebutConge: req.body.dateDebutConge,
          dateFinConge: req.body.dateFinConge,
          nomberJours: parseFloat(req.body.nomberJours),
          nomberJoursOuvrables: parseFloat(req.body.nomberJoursOuvrables),
          location : location,
          key : key,
          status : false,
          reset : parseFloat(req.body.nomberJoursOuvrables) - parseFloat(req.body.nomberJours),
          year : today.getFullYear()

        }

      await Conge.updateOne({ adminId : adminId },  { $push: { history: history } })
      .then((result) => {
          res.status(200).json({ data: result });
      })
      .catch((error) => {
          res.status(200).json({ error: error.message });
      });

      }


});

module.exports = router;