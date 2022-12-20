const express = require('express');
const router = express.Router();
const SalarieController = require('../controllers/SalarieController');
const Salarie = require('../models/Salarie');
const multer = require("multer");
const AWS = require("aws-sdk");
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

const storage = multer.memoryStorage();
const upload = multer({
  storage
});

const s3Uploadv2 = async (files) => {
  const params = files.map((file) => {
    return {
      Bucket: DO_SPACES_NAME,
      Key: `fiche-salarie-${Date.now().toString(10).slice(2, 50)}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

var type = upload.any();

router.post('/create', type, async(req, res, next) => {

    try {

          if(req.files) {

            const result = await s3Uploadv2(req.files);

            if(result) {

              try {
  
                  const keyCin = await result[0].key;
                  const keyDiplome = await result[1].key;
                  const keyPhoto = await result[2].key;
                  const keyAutres = await result[3].key;
                  const keyMedical = await result[4].key;
  
                  await Salarie({
                    adresse : req.body.adresse,
                    banque : req.body.banque,
                    cnss : req.body.cnss,
                    dateEmbauche : req.body.dateEmbauche,
                    dateQuitter : req.body.dateQuitter,
                    email : req.body.email,
                    identite : req.body.identite,
                    matricule : req.body.matricule,
                    niveauEtude : req.body.niveauEtude,
                    nom : req.body.nom,
                    pays: req.body.pays,
                    poste : req.body.poste,
                    prenom : req.body.prenom,
                    rip : req.body.rip,
                    telephone : req.body.telephone,
                    typeContart : req.body.typeContart,
                    typeQuitter : req.body.typeQuitter,
                    ville : req.body.ville,
                    cin : keyCin,
                    diplome : keyDiplome,
                    photo : keyPhoto,
                    autres : keyAutres,
                    medical : keyMedical
                  }).save()
                  .then(() => {
                    return res.json({ status: "success" });
                  })
                  .catch((error) => {
                    console.log(error.message);
                    return res.json({ err: error.message });
                  });
  
              } catch (error) {
                console.log(error.message);
              }

            }

          } 

    } catch (err) {
      console.log(err.message);
    }

});



router.post('/update', type, async (req, res) => {


      try {

            if(req.body.salarieId) {

                  if(req.files){

                    const result = await s3Uploadv2(req.files);

                            if(result[0] != null) {
                                await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                                  cin : result[0].key,
                                }})
                                .then((result) => {
                                  console.log(result);
                                })
                                .catch((error) => {
                                  console.log(error.message);
                                });
                            }

                            if(result[1] != null) {
                                await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                                  diplome: result[1].key,
                                }})
                                .then((result) => {
                                  console.log(result);
                                })
                                .catch((error) => {
                                  console.log(error.message)
                                });
                            }

                            if(result[2] != null) {
                                await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                                  photo : result[2].key,
                                }})
                                .then((result) => {
                                  console.log(result);
                                })
                                .catch((error) => {
                                  console.log(error.message)
                                });
                            }

                            if(result[3] != null) {
                                await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                                  autres : result[3].key,
                                }})
                                .then((result) => {
                                  console.log(result);
                                })
                                .catch((error) => {
                                  console.log(error.message)
                                });
                            }

                            if(result[4] != null) {
                                await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                                  medical : result[4].key,
                                }})
                                .then((result) => {
                                  console.log(result);
                                })
                                .catch((error) => {
                                  console.log(error.message)
                                });
                            }

                            await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                              adresse : req.body.adresse,
                              banque : req.body.banque,
                              cnss : req.body.cnss,
                              dateEmbauche : req.body.dateEmbauche,
                              dateQuitter : req.body.dateQuitter,
                              email : req.body.email,
                              identite : req.body.identite,
                              matricule : req.body.matricule,
                              niveauEtude : req.body.niveauEtude,
                              nom : req.body.nom,
                              pays: req.body.pays,
                              poste : req.body.poste,
                              prenom : req.body.prenom,
                              rip : req.body.rip,
                              telephone : req.body.telephone,
                              typeContart : req.body.typeContart,
                              typeQuitter : req.body.typeQuitter,
                              ville : req.body.ville,
                            }})
                            .then((result) => {
                              console.log(result);
                              return res.json({ status: "success" });
                            })
                            .catch((error) => {
                              console.log(error.message);
                              return res.json({ err: error.message });
                            });


                  } else {

                    await Salarie.findByIdAndUpdate(req.body.salarieId , { $set : {
                      adresse : req.body.adresse,
                      banque : req.body.banque,
                      cnss : req.body.cnss,
                      dateEmbauche : req.body.dateEmbauche,
                      dateQuitter : req.body.dateQuitter,
                      email : req.body.email,
                      identite : req.body.identite,
                      matricule : req.body.matricule,
                      niveauEtude : req.body.niveauEtude,
                      nom : req.body.nom,
                      pays: req.body.pays,
                      poste : req.body.poste,
                      prenom : req.body.prenom,
                      rip : req.body.rip,
                      telephone : req.body.telephone,
                      typeContart : req.body.typeContart,
                      typeQuitter : req.body.typeQuitter,
                      ville : req.body.ville,
                    }})
                    .then((result) => {
                      console.log(result);
                      return res.json({ status: "success" });
                    })
                    .catch((error) => {
                      console.log(error.message);
                      return res.json({ err: error.message });
                    });
                    
                  }
            }
        
      } catch (err) {
        console.log(err.message);
        res.status(200).json({ msg: err.message });
      }


});

router.post('/deleteMany', async (req, res) => {
  let salariesId = await req.body.salariesId;
  let cins = await req.body.cins;
  let diplomes = await req.body.diplomes;
  let photos = await req.body.photos;
  let autress = await req.body.autress;
  let medicals = await req.body.medicals;

  try {

          if(cins.length > 1) {
                for(let i = 0; i < cins.length; i++) {
                    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: cins[i] }).promise();
                }
          }

          if(diplomes.length > 1) {
                for(let i = 0; i < diplomes.length; i++) {
                    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: diplomes[i] }).promise();
                }
          }

          if(photos.length > 1) {
                for(let i = 0; i < photos.length; i++) {
                    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: photos[i] }).promise();
                }
          }

          if(autress.length > 1) {
                for(let i = 0; i < autress.length; i++) {
                    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: autress[i] }).promise();
                }
          }

          if(medicals.length > 1) {
                for(let i = 0; i < medicals.length; i++) {
                    await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: medicals[i] }).promise();
                }
          }


          await Salarie.deleteMany({ _id : salariesId })
          .then(() => {
            res.status(200).json({ msg: "Les Certficats a été supprimé avec succès" });
          })
          .catch((error) => {
            res.status(200).json({ msg: error.message });
          });

      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
});

router.post('/delete', async (req, res) => {

    let cin = await req.body.cin;
    let diplome = await req.body.diplome;
    let photo = await req.body.photo;
    let autres = await req.body.cin;
    let medical = await req.body.medical;
    let salarieId = await req.body.salarieId;

  try {

      if(typeof cin == "string") {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: cin }).promise();
      }

      if(typeof diplome == "string") {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: diplome }).promise();
      }

      if(typeof photo == "string") {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: photo }).promise();
      }

      if(typeof autres == "string") {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: autres }).promise();
      }

      if(typeof medical == "string") {
          await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: medical }).promise();
      }

      await Salarie.deleteOne({ _id : salarieId })
      .then(() => {
        res.status(200).json({ msg: "Les Certficats a été supprimé avec succès" });
      })
      .catch((error) => {
        res.status(200).json({ msg: error.message });
      });

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }

});






router.post('/read', SalarieController.read);
router.post('/select', SalarieController.select);
router.get('/display/:filename', SalarieController.displaySalarie);



module.exports = router;