const express = require('express');
const router = express.Router();
const Paiement = require("../models/Paiement");
const multer = require("multer");
const Affaire = require('../models/Affaire');
const path = require('path');
const fs = require('fs');


//Configuration for Multer file Paiement
const multerStorageBonCommande = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "paiement/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `paiement-GTH-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

// filter
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };


  const Paiements = multer({
    storage: multerStorageBonCommande,
    fileFilter: multerFilter,
  });


// enregistre Preuve Paiment by affaireID
router.post('/create', Paiements.single("file"), async(req, res) => {

  const { typePaiement, refTransaction, targetAffaire } = req.body;


  await Paiement({
       
    refTransaction : refTransaction,
    affaireId : targetAffaire,
    typePaiement : typePaiement,
    nameFilePaiement : req.file.filename

  })
    .save()
    .then(async () => {

          await Affaire.findByIdAndUpdate(targetAffaire, { $set: { emise : req.file.filename } })
          .then(() => {
            res
              .status(200)
              .json({
                msg: "succès",
              });
          })
          .catch((err) => {
            res.status(200).json({ msg: err.message });
          });

    })
    .catch((err) => {
      res.status(200).json({ data: err });
    });

});


// enregistre Preuve Paiment by affaireID
router.post('/delete', async(req, res) => {

  const { affaireId, nameFilePaiement } = req.body;


  var tempFilePath = path.join(__dirname, `../paiement/${nameFilePaiement}`);
  // delete file named 'sample.txt'
  fs.unlink(tempFilePath, async (err) => {

    if(!err) {

        await Paiement.deleteOne({ nameFilePaiement : nameFilePaiement })
          .then(async() => {
        
              await Affaire.findByIdAndUpdate(affaireId, { $set: { emise : "false" } })
              .then(() => {
                res
                  .status(200)
                  .json({
                    msg: "succès",
                  });
              })
              .catch((err) => {
                res.status(200).json({ msg: err.message });
              });
        
          })
          .catch((err) => {
            res.status(200).json({ msg: err.message });
          });
        }
  });


});



// enregistre Preuve Paiment by affaireID
router.get('/read/:filename', async(req, res) => {

  const filename = req.params.filename;
  const dirPath = path.join(__dirname, `../paiement/${filename}`);

  fs.readFile(dirPath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });


});



module.exports = router;
