const express = require('express');
const router = express.Router();
const EtalonnageController = require('../controllers/EtalonnageController');
const Etalonnage = require('../models/Etalonnage');
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
      cb(null, `gth-certficat-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});



router.post('/create', upload.single("file"), async (req, res) => {

    const { designation, marque, identification, etalonnieLe, prochaineEtalonnage, certificatsEtalonnage } = req.body;
    const { location , originalname , key } = req.file;

    Etalonnage({
        designation: designation,
        marque: marque,
        identification: identification,
        etalonnieLe: etalonnieLe,
        prochaineEtalonnage: prochaineEtalonnage,
        certificatsEtalonnage: certificatsEtalonnage,
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


router.post('/delete', async (req, res) => {

    let filename = req.body.filename;

    try {

        if(req.body.filename.length > 1) {

            for(let i = 0; i < req.body.filename.length; i++) {
                await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename[i] }).promise();
            }
            await Etalonnage.deleteMany({ filename: filename });
            res.status(200).json({ msg: "Les Certficats a été supprimé avec succès" });
        }

        if(req.body.filename.length == 1) {
            await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
            await Etalonnage.deleteOne({ filename: filename });
            res.status(200).json({ msg: "Le Certficat a été supprimé avec succès" });
        }

    } catch (err) {
      res.status(400).json({ msg: err.message });
    }

});

router.get('/display/:filename', EtalonnageController.displayEtalonnage);
router.post('/read', EtalonnageController.read);
router.post('/select', EtalonnageController.select);


router.post('/update',  upload.single("file"), async (req, res) => {

    const { etalonnageId, designation, marque, identification, etalonnieLe, prochaineEtalonnage, certificatsEtalonnage } = req.body;
    const { location , originalname , key } = req.file;

    await Etalonnage.updateOne({ _id : etalonnageId } ,{
        designation: designation,
        marque: marque,
        identification: identification,
        etalonnieLe: etalonnieLe,
        prochaineEtalonnage: prochaineEtalonnage,
        certificatsEtalonnage: certificatsEtalonnage,
        location : location,
        originalname : originalname,
        filename : key
    })
    .then((result) => {
        res.status(200).json({ msg : "succes" });
    })
    .catch((error) => {
        res.status(200).json({ err : error.message });
    });
});

module.exports = router;