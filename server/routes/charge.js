const express = require('express');
const router = express.Router();
const Charge = require("../models/Charge");
const ChargeController = require("../controllers/ChargeController");
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
      cb(null, `gth-charge-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});

router.post('/create', upload.single("file"), async (req, res) => {

        const {    
            article,
            categorie,
            dateEcheance,
            dateFacture,
            modePaiement,
            montantHT,
            montantHTT,
            nomFournisseur,
            nomFournisseurId,
            numeroFacture,
            paiement,
            tauxTVA,
            type
         } = req.body;


        await Charge({
            article : article,
            categorie :  categorie,
            dateEcheance : dateEcheance,
            nomFournisseur : [nomFournisseurId, nomFournisseur],
            numeroFacture : numeroFacture,
            dateFacture : dateFacture,
            modePaiement : modePaiement,
            montantHT : montantHT,
            montantHTT : montantHTT,
            paiement : paiement,
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

  const {                 
    article,
    categorie,
    dateEcheance,
    dateFacture,
    modePaiement,
    montantHT,
    montantHTT,
    nomFournisseur,
    nomFournisseurId,
    numeroFacture,
    paiement,
    tauxTVA,
    type,
    chargeId,
    filename
    } = req.body;


  await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
  await Charge.updateOne({ _id: chargeId }, {$set: {
            article : article,
            categorie :  categorie,
            dateEcheance : dateEcheance,
            nomFournisseur : [nomFournisseurId, nomFournisseur],
            numeroFacture : numeroFacture,
            dateFacture : dateFacture,
            modePaiement : modePaiement,
            montantHT : montantHT,
            montantHTT : montantHTT,
            paiement : paiement,
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
          await Charge.deleteMany({ filename: filename });
          res.status(200).json({ msg: "Les Certficats charge a été supprimé avec succès" });
      }

      if(req.body.filename.length == 1) {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename }).promise();
          await Charge.deleteOne({ filename: filename });
          res.status(200).json({ msg: "Le Certficat charge a été supprimé avec succès" });
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


router.post('/select', ChargeController.select);
router.post('/read', ChargeController.read);



module.exports = router;