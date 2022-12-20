const express = require('express');
const router = express.Router();
const AgrementController = require('../controllers/AgrementController');
const Agrement = require('../models/Agrement');
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
      cb(null, `gth-agrement-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});



router.post('/create', upload.single("file"), async (req, res) => {

    const {
        dateArgument,
        dateExpiration,
        dateRenouvellement,
        duree,
        nomArgument,
        nomMinistre,
        preuve,
        status 
    } = req.body;

    const { location , originalname , key } = req.file;

    await Agrement({
        dateArgument: dateArgument,
        dateExpiration: dateExpiration,
        dateRenouvellement: dateRenouvellement,
        duree: duree,
        nomArgument: nomArgument,
        nomMinistre :nomMinistre,
        preuve : preuve,
        status : status,
        location : location,
        originalname : originalname,
        filename : key
    })
    .save()
    .then(() => {
        res.status(200).json({ msg : "succes" });
    })
    .catch((error) => {
        console.log(error);
        res.status(200).json({ err : error.message });
    });
});


router.post('/delete', async (req, res, next) => {

    let filename = req.body.filename;

    try {

        if(req.body.filename.length > 1) {

              for(let i = 0; i < req.body.filename.length; i++) {
                  await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename[i] }).promise()
              }

              await Agrement.deleteMany({ filename: filename })
              .then((result) => {
                res.status(200).json({ msg: "Les Agrements a été supprimé avec succès" , result : result });
              })
              .catch((error) => {
                res.status(200).json({ msg: error.message });
              });
        }

        if(typeof req.body.filename == "string") {

            await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise()
            .then(async () => {
                await Agrement.deleteOne({ filename: filename }).
                then((result) => {
                  res.status(200).json({ msg: "La Agrement a été supprimé avec succès"});
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

router.get('/display/:filename', AgrementController.displayAgrement);
router.post('/read', AgrementController.read);
router.post('/select', AgrementController.select);


router.post('/update',  upload.single("file"), async (req, res) => {

    const {
        dateArgument,
        dateExpiration,
        dateRenouvellement,
        duree,
        nomArgument,
        nomMinistre,
        preuve,
        status 
        } = req.body;

    const { location , originalname , key } = req.file;

    await Agrement.updateOne({ _id : fichetechniqueId } ,{
        dateArgument: dateArgument,
        dateExpiration: dateExpiration,
        dateRenouvellement: dateRenouvellement,
        duree: duree,
        nomArgument: nomArgument,
        nomMinistre :nomMinistre,
        preuve : preuve,
        status : status,
        location : location,
        originalname : originalname,
        filename : key
    })
    .then((result) => {
        res.status(200).json({ msg : "succes", result : result });
    })
    .catch((error) => {
        res.status(200).json({ err : error.message });
    });


});



module.exports = router;