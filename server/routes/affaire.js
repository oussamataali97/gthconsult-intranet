const express = require('express');
const router = express.Router();
const AffaireController = require('../controllers/AffaireController');
const Affaire = require("../models/Affaire");
const Last = require("../models/Last");
const Rapport = require("../models/Rapport");
const Mission = require("../models/Mission");
const BonCommande = require("../models/BonCommande");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const handlebars = require("handlebars");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const {
  EMAIL,
  PASSWORD,
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_NAME,
  JWT_SECRET,
  CLIENT_ID,
  SECRET_ID,
  REFRESH_TOKEN,
} = require("../config");
var moment = require("moment");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
OAuth2_client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const accessToken = OAuth2_client.getAccessToken();

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
      cb(null, `gth-${Date.now().toString(10).slice(2, 10)}`);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});


//Configuration for Multer file Devis
const multerStorageDevis = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "devis/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `devi-GTH-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

//Configuration for Multer file Bon cammande
const multerStorageBonCommande = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "bonCommandes/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `bc-GTH-${file.fieldname}-${Date.now()}.${ext}`);
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

  // Storage multer Devis
  const devis = multer({
    storage: multerStorageDevis,
    fileFilter: multerFilter,
  });

  // Storage multer BC
  const BC = multer({
    storage: multerStorageBonCommande,
    fileFilter: multerFilter,
  });

  // Get Last Affaire
router.get('/last', AffaireController.last);

// Get Indecateurs Les Affaires
router.post('/indicateur', AffaireController.Indicateur);


router.post('/create', devis.single("file"), async (req, res) => {
    // req body
    const { numeroAffaire, apporteurAffaire, clientId, interlocuteurId } = req.body;
    // gEt missions data for stocke ref rapport in affaire
    const mission = await Mission.find({ numeroAffaire : numeroAffaire });
    var refRapports = new Array();
    var sendRapport = new Array();
    // looop for get ref rapport
    mission.forEach((element) => {
      element.equipement.forEach((el) => {
          for(let i = 0; i < el.refRapport.length; i++) {
            refRapports.push(el.refRapport[i]);
            sendRapport.push(false);
          }
      })
    });

    await Affaire({
        clientId :clientId,
        interlocuteurId : interlocuteurId,
        numeroAffaire : numeroAffaire,
        nameFileAffaire : req.file.filename,
        apporteurAffaire : apporteurAffaire,
        bonCommande: false,
        renseignerIntervention : false,
        importRapport: false,
        refRapport : refRapports,
        sendRapport: sendRapport,
      })
        .save()
        .then(async () => {
          // Update Status  -> statusWith
          await Mission.updateMany({numeroAffaire: numeroAffaire}, {$set: {statusWithAffaire: true}}, {multi: true})
            .then(async () => {
                // delete all mission not compltete with clientId and statusWith
                await Mission.findOneAndDelete({ clientId : req.body.clientId , statusWithAffaire : false })
                .then(async () => {
                      const last = await Last.findOne();
                       const lastaffaireId = last._id;
                      await Last.findByIdAndUpdate(lastaffaireId, { $set: { LastAffaire : numeroAffaire} })
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
                .catch((error) => {
                  res.status(200).json({ error });
                });
            })
            .catch((error) => {
                res.status(200).json({ error });
            })
          
        })
        .catch((err) => {
          res.status(200).json({ data: err });
        });
});


// Saved Rapport 
router.post('/saved', upload.single("file"), async (req, res) => {


  // req body
  const { referenceRapport, clientId, designation, dateProductionControle, dateIntervention, responsableClient, missionId, i, j, index, numeroAffaire, typeRapport, categorie } = req.body;
  const { originalname, location, key } = req.file;
  // Check ref Exist or No
  const checkExistRefRapport = await Affaire.find({ refRapport: { $in: [referenceRapport] } });

  // condition Exist True
  if(checkExistRefRapport.length == 0) {

    // add new Ref
    const affaire = await Affaire.find({ numeroAffaireid: numeroAffaire });
    affaire[0].refRapport.push(referenceRapport);
    affaire[0].sendRapport.push(true);
    var ref = affaire[0].refRapport;
    var send = affaire[0].sendRapport;

    // Update  Affaire
    Affaire.updateOne({ numeroAffaire: numeroAffaire}, { $set: { refRapport : ref, sendRapport : send } })
    .then(async () => {

          const mission = await Mission.findById(missionId);
          mission.equipement[i].sendRapport[index] = true;
          mission.equipement[i].refRapport.push(referenceRapport);
          var eq = mission.equipement;

          Mission.updateOne({ _id: missionId }, { $set: { equipement : eq } })
          .then(async () => {

              await Rapport({

                sendLocal : true,
                referenceRapport : referenceRapport,
                designation: designation[0],
                dateIntervention: dateIntervention,
                responsableClient: responsableClient,
                dateProductionControle: dateProductionControle,
                originalname : originalname,
                filename : key,
                clientId: clientId,
                category : category,
                typeRapport : typeRapport,
                confirmation : 0,
                url : location,
                numeroAffaire : numeroAffaire

                }).save()
                .then(async (response) => {
                  //Get id last rapport
                  const last = await Last.find();
                  Last.updateOne({ _id: last[0]._id }, { $set: { LastRapport : referenceRapport } })
                    .then(() => {
                      res.status(200).json({ msg : response.referenceRapport });
                    })
                    .catch(() => {
                      res.status(200).json({ msg : err.message });
                    });       
                })
                .catch((err) => {
                  res.status(200).json({ msg : err.message });
                });

          })
          .catch((err) => {
              res.status(200).json({ data: err.message, msg : "echec" });
          });

    })
    .catch((err) => {
        res.status(200).json({ data: err.message, msg : "echec" });
    });


    } else {

        await Rapport({

            sendLocal : true,
            referenceRapport : referenceRapport,
            designation: designation[0],
            dateIntervention: dateIntervention,
            responsableClient: responsableClient,
            dateProductionControle: dateProductionControle,
            originalname : originalname,
            filename : key,
            clientId: clientId,
            category : categorie,
            typeRapport : typeRapport,
            confirmation : 0,
            url : location,
            numeroAffaire : numeroAffaire

          }).save()
          .then(async (response) => {

            const mission = await Mission.findById(missionId);
            mission.equipement[i].sendRapport[index] = true;
            var eq = mission.equipement;

              Mission.updateOne({ _id: missionId }, { $set: { equipement : eq } })
              .then(async () => {
                //Get index refRapport for update true in sendRapport
                const affaire = await Affaire.find({ numeroAffaire: numeroAffaire });
                const index = affaire[0].refRapport.indexOf(referenceRapport);
                affaire[0].sendRapport[index] = true;
                const newSendRapport = affaire[0].sendRapport;
                Affaire.updateOne({ numeroAffaire: numeroAffaire} , { $set: { sendRapport : newSendRapport } })
                  .then(async () => {
                    res.status(200).json({ msg : response.referenceRapport });
                  })
                  .catch(() => {
                    res.status(200).json({ msg : err.message });
                  });
              })
              .catch(() => {
                res.status(200).json({ msg : err.message });
              })

          })
          .catch((err) => {
            res.status(200).json({ msg : err.message });
          })

    }

});


// enregistre bon coammande de client
router.put('/bonCommande', BC.single("file"), async(req, res) => {

  const { affaireId, dateBonCammnade, numeroBonCammnade } = req.body;

  await BonCommande({
       
    dateBonCammnade : dateBonCammnade,
    numeroBonCammnade : numeroBonCammnade,
    bonCommande : req.file.filename

  })
    .save()
    .then(async () => {

      let today = new Date();

      await Affaire.findByIdAndUpdate(affaireId, { $set: {
        bonCommande: req.file.filename,
        numeroBonCommande : numeroBonCammnade,
        dateBE : today
      } })
      .then((result) => {
        res.status(200).json({ msg: "succès", result: req.file.filename });
      })
      .catch((err) => {
        res.status(200).json({ msg: err.message });
      });
      
    })
    .catch((err) => {
      res.status(200).json({ data: err });
    });

});





router.post('/getRefClientByNumeroAffaire', AffaireController.getRefClientByNumeroAffaire);
router.post('/EnvoyerClientEmail', AffaireController.EnvoyerClientEmail);
router.post('/getAffaireById', AffaireController.getAffaireById);
router.post('/classementRapport', AffaireController.ClassementRapport);
router.post('/selectRapports', AffaireController.selectRapport);
router.get('/readAll', AffaireController.readAll);
router.get('/checkRapports', AffaireController.checkRapports);
router.get('/displaydevis/:filename', AffaireController.displaydevis);
router.get('/displaybc/:filename', AffaireController.displaybc);
router.get('/displayintervention/:filename', AffaireController.displayintervention);
router.get('/accepterRapport/:numeroAffaire', AffaireController.accepterRapport);
router.post('/deleteImportRapport', AffaireController.DeleteImportRapport);
router.post('/deletebc', AffaireController.DeleteBonCammande);
router.post('/delete', AffaireController.delete);
router.get('/getLastRapport', AffaireController.GetLastRapport);
router.post('/updateRapport', AffaireController.ModifierRapport);





module.exports = router;
