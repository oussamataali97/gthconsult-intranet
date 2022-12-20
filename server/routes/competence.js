const express = require('express');
const router = express.Router();
const Competence = require('../models/Competence');
const CompetenceController = require('../controllers/CompetenceController');
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
      cb(null, `gth-competence-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});

router.post('/create', upload.single("file"), async (req, res) => {
 
        await Competence({
            nom: req.body.nom,
            prenom: req.body.prenom,
            dateFormation: req.body.dateFormation,
            metier: req.body.metier,
            domaineFamille: req.body.domaineFamille,
            qualification: req.body.qualification,
            connaissance: req.body.connaissance,
            moduleFormation: req.body.moduleFormation,
            location : req.file.location,
            originalname : req.file.originalname,
            filename : req.file.key,
        }).save()
        .then((result) => {
            res.status(200).json({ msg : "succes" });
        })
        .catch((error) => {
            res.status(200).json({ error: error.message });
        });
});


router.post('/delete', async (req, res) => {

    let filename = req.body.filename;
    console.log(req.body.filename.length)

    try {

        if(req.body.filename.length > 1) {

              for(let i = 0; i < req.body.filename.length; i++) {
                  await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename[i] }).promise()
              }

              await Competence.deleteMany({ filename: filename })
              .then((result) => {
                res.status(200).json({ msg: "Les Competences a été supprimé avec succès" , result : result });
              })
              .catch((error) => {
                res.status(200).json({ msg: error.message });
              });
        }

        if(typeof filename == "string") {

            await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise()
            .then(async () => {
                await Competence.deleteOne({ filename: filename }).
                then((result) => {
                  res.status(200).json({ msg: "La competence a été supprimé avec succès", result: result });
                })
                .catch((error) => {
                  res.status(200).json({ msg: error.message });
                });
            })
            .catch((error) => {
              res.status(200).json({ msg: error.message });
            });
        }

    } catch (err) {
      res.status(400).json({ msg: err.message });
    }

});

router.get('/display/:filename', CompetenceController.displayCompetence);
router.post('/read', CompetenceController.read);
router.post('/select', CompetenceController.select);


router.post('/update',  upload.single("file"), async (req, res) => {

    const { competenceId, filename } = req.body;

    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise()
    .then(async () => {

            await Competence.updateOne({ _id : competenceId } ,{
                nom: req.body.nom,
                prenom: req.body.prenom,
                dateFormation: req.body.dateFormation,
                metier: req.body.metier,
                domaineFamille: req.body.domaineFamille,
                qualification: req.body.qualification,
                connaissance: req.body.connaissance,
                moduleFormation: req.body.moduleFormation,
                location : req.file.location,
                originalname : req.file.originalname,
                filename : req.file.key
            })
            .then((result) => {
                res.status(200).json({ msg : "succes", result : result });
            })
            .catch((error) => {
                res.status(200).json({ err : error.message });
            });
    })
    .catch((error) => {
      res.status(200).json({ msg: error.message });
    });

});



module.exports = router;