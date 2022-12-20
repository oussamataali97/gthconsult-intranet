const express = require('express');
const router = express.Router();
const Depence = require("../models/Depence");
const DepenceController = require("../controllers/DepenceController");
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
      cb(null, `gth-depence-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});

router.post('/create', upload.single("file"), async (req, res) => {

        const { dateFacture, montantHT, montantHTT, nomSociete, nomSocieteId, numeroFacture, tauxTVA, type } = req.body;
        await Depence({
            dateFacture : dateFacture,
            montantHT :  montantHT,
            montantHTT : montantHTT,
            nomSociete : [nomSocieteId, nomSociete],
            numeroFacture : numeroFacture,
            tauxTVA : tauxTVA,
            type : type,
            location : req.file.location,
            originalname : req.file.originalname,
            filename : req.file.key
        }).save()
        .then((result) => {
            res.status(200).json({ msg : "succes" , result : result});
        })
        .catch((error) => {
            res.status(200).json({ error: error.message });
        });
});

router.post('/update', upload.single("file"), async (req, res) => {

  const { dateFacture, montantHT, montantHTT, nomSociete, nomSocieteId, numeroFacture, tauxTVA, type, depenseId, filename } = req.body;
  await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
  await Depence.updateOne({ _id: depenseId }, {$set: {
            dateFacture : dateFacture,
            montantHT :  montantHT,
            montantHTT : montantHTT,
            nomSociete : [nomSocieteId, nomSociete],
            numeroFacture : numeroFacture,
            tauxTVA : tauxTVA,
            type : type,
            location : req.file.location,
            originalname : req.file.originalname,
            filename : req.file.key
    }}, {multi: true})
    .then((result) => {
        res.status(200).json({ msg : "succes" , result : result});
      })
    .catch((error) => {
        res.status(200).json({ error: error.message });
    });
});



router.post('/delete', async (req, res) => {

  let filename = req.body.filename;

  try {

      if(req.body.filename.length > 1) {

          for(let i = 0; i < req.body.filename.length; i++) {
              await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename[i] }).promise();
          }
          await Depence.deleteMany({ filename: filename });
          res.status(200).json({ msg: "Les Certficats a été supprimé avec succès" });
      }

      if(req.body.filename.length == 1) {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
          await Depence.deleteOne({ filename: filename });
          res.status(200).json({ msg: "Le Certficat a été supprimé avec succès" });
      }

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }

});

router.get('/display/:filename', async (req, res) => {
    const filename = req.params.filename;
    let x = await s3.getObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
    res.writeHead(200, { "Content-Type": "application/pdf" });
    res.write(x.Body, "binary");
    res.send();
});


router.post('/select', DepenceController.select);
router.post('/read', DepenceController.read);

module.exports = router;