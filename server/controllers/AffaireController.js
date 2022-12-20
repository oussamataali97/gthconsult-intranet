const Affaire = require("../models/Affaire");
const Mission = require("../models/Mission");
const Rapport = require("../models/Rapport");
const Last = require("../models/Last");
const BonCommande = require("../models/BonCommande");
const Intervention = require("../models/Intervention");
const Bordereau = require("../models/Bordereau");
const Facture = require("../models/Facture");
const Paiement = require("../models/Paiement");
const Interlocuteur = require("../models/Interlocuteur");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, PASSWORD, EMAIL, CLIENT_ID, SECRET_ID, REFRESH_TOKEN } = require('../config');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
OAuth2_client.setCredentials({ refresh_token : REFRESH_TOKEN })
const accessToken = OAuth2_client.getAccessToken();
const handlebars = require("handlebars");
const path = require('path');
const fs = require('fs');

// Get Affaire by Id
exports.getAffaireById = async (req, res, next) => {
  const { affaireId } = req.body;
  const affaire = await Affaire.findById(affaireId);
  return res.status(200).json({ affaire });

}
// Get Affaire by Id
exports.getAffaireById = async (req, res, next) => {
  
  const { affaireId } = req.body;

  const affaire = await Affaire.findById(affaireId);
  return res.status(200).json({ affaire });

}


// Indecateur
exports.Indicateur = async (req, res, next) => {
  const { annee } = req.body;

    // get last day in Fevrier by year
    var d = new Date();
    const lastDay =  new Date(annee, 2, 0).getDate();
    var listeNumeroAffaires = [];


    // Start Janvier
    listeNumeroAffaires = [];
    const janvier = await Affaire.find({"date": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
    for(let i = 0; i < janvier.length; i++) {
      listeNumeroAffaires.push(janvier[i].numeroAffaire);
    }
    const missionsJanvier = await Mission.find({ numeroAffaire : listeNumeroAffaires });
    var prixJanvier = 0;
    for(let j = 0; j < missionsJanvier.length; j++) {
      prixJanvier = prixJanvier + missionsJanvier[j].prix;
    }
    // End Janvier


  // Start Fevrier
  listeNumeroAffaires = [];
  const fevrier = await Affaire.find({"date": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
  for(let i = 0; i < fevrier.length; i++) {
    listeNumeroAffaires.push(fevrier[i].numeroAffaire);
  }
  const missionsFevrier = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixFevrier = 0;
  for(let j = 0; j < missionsFevrier.length; j++) {
    prixFevrier = prixFevrier + missionsFevrier[j].prix;
  }
  // End Fevrier

  // Start mars
  listeNumeroAffaires = [];
  const mars = await Affaire.find({"date": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
  for(let i = 0; i < mars.length; i++) {
    listeNumeroAffaires.push(mars[i].numeroAffaire);
  }
  const missionsMars = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixMars = 0;
  for(let j = 0; j < missionsMars.length; j++) {
    prixMars = prixMars + missionsMars[j].prix;
  }
  // End mars


  // Start Avril
  listeNumeroAffaires = [];
  const avril = await Affaire.find({"date": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
  for(let i = 0; i < avril.length; i++) {
    listeNumeroAffaires.push(avril[i].numeroAffaire);
  }
  const missionsAvril = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixAvril = 0;
  for(let j = 0; j < missionsAvril.length; j++) {
    prixAvril = prixAvril + missionsAvril[j].prix;
  }
  // End Avril

  // Start Mai
  listeNumeroAffaires = [];
  const mai = await Affaire.find({"date": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
  for(let i = 0; i < mai.length; i++) {
    listeNumeroAffaires.push(mai[i].numeroAffaire);
  }
  const missionsMai = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixMai = 0;
  for(let j = 0; j < missionsMai.length; j++) {
    prixMai = prixMai + missionsMai[j].prix;
  }

  // End Mai

  // Start Juin
  listeNumeroAffaires = [];
  const juin = await Affaire.find({"date": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
  for(let i = 0; i < juin.length; i++) {
    listeNumeroAffaires.push(juin[i].numeroAffaire);
  }
  const missionsJuin = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixJuin = 0;
  for(let j = 0; j < missionsJuin.length; j++) {
    prixJuin = prixJuin + missionsJuin[j].prix;
  }
  // End Juin

  // Start Juillet
  listeNumeroAffaires = [];
  const juillet = await Affaire.find({"date": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
  for(let i = 0; i < juillet.length; i++) {
    listeNumeroAffaires.push(juillet[i].numeroAffaire);
  }
  const missionsJuillet = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixJuillet = 0;
  for(let j = 0; j < missionsJuillet.length; j++) {
    prixJuillet = prixJuillet + missionsJuillet[j].prix;
  }
  // End Juillet

  // Start Aout
  listeNumeroAffaires = [];
  const aout = await Affaire.find({"date": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
  for(let i = 0; i < aout.length; i++) {
    listeNumeroAffaires.push(aout[i].numeroAffaire);
  }
  const missionsAout = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixAout = 0;
  for(let j = 0; j < missionsAout.length; j++) {
    prixAout = prixAout + missionsAout[j].prix;
  }
  // fin Aout

  // Start Septembre
  listeNumeroAffaires = [];
  const septembre = await Affaire.find({"date": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
  for(let i = 0; i < septembre.length; i++) {
    listeNumeroAffaires.push(septembre[i].numeroAffaire);
  }
  const missionsSeptembre = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixSeptembre = 0;
  for(let j = 0; j < missionsSeptembre.length; j++) {
    prixSeptembre = prixSeptembre + missionsSeptembre[j].prix;
  }
  // End Septembre  


  // Start Octobre
  listeNumeroAffaires = [];
  const october = await Affaire.find({"date": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
  for(let i = 0; i < october.length; i++) {
    listeNumeroAffaires.push(novembre[i].numeroAffaire);
  }
  const missionsOctober = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixOctober = 0;
  for(let j = 0; j < missionsOctober.length; j++) {
    prixOctober = prixOctober + missionsOctober[j].prix;
  }
  // End Octobre  

  // Start Novembre
  listeNumeroAffaires = [];
    const novembre = await Affaire.find({"date": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
    for(let i = 0; i < novembre.length; i++) {
      listeNumeroAffaires.push(novembre[i].numeroAffaire);
    }
    const missionsNovembre = await Mission.find({ numeroAffaire : listeNumeroAffaires });
    var prixNovembre = 0;
    for(let j = 0; j < missionsNovembre.length; j++) {
      prixNovembre = prixNovembre + missionsNovembre[j].prix;
    }
  // End Novembre  


  // Start Decembre
  listeNumeroAffaires = [];
  const  decembre = await Affaire.find({"date": { $gte:new Date(`${annee}-12-01`), $lt:new Date(`${annee}-12-31`) }});
  for(let i = 0; i < decembre.length; i++) {
    listeNumeroAffaires.push(decembre[i].numeroAffaire);
  }
  const missions = await Mission.find({ numeroAffaire : listeNumeroAffaires });
  var prixDecembre = 0;
  for(let j = 0; j < missions.length; j++) {
    prixDecembre = prixDecembre + missions[j].prix;
  }
  // End Decembre

  res.status(200).json({ janvier, prixJanvier, fevrier, prixFevrier, mars, prixMars, avril, prixAvril,  mai, prixMai, juin, prixJuin, juillet, prixJuillet, aout, prixAout, septembre, prixSeptembre, october, prixOctober, novembre, prixNovembre,  decembre, prixDecembre });

};


// read all Affaire with date asc
exports.last = async (req, res, next) => {
  const affaire = await Affaire.find().sort({ date : -1}).limit(1);
  await res.status(200).json({ affaire });
};

// Delete Client 
exports.delete = async (req, res, next) => {

  let { affaireId } = req.body;

  if(Array.isArray(affaireId) == true) {

        for(let i = 0; i < affaireId.length; i++) {

            await Affaire.findById(affaireId[i])
            .then((response) => {

              // path files delete
              var pathFileDevis = path.join(__dirname, `../devis/${response.nameFileAffaire}`);
              var pathFileBC = path.join(__dirname, `../bonCommandes/${response.bonCommande}`);
              var pathFileBE = path.join(__dirname, `../be/${response.be}`);
              var pathFileIntervention = path.join(__dirname, `../intervention/${response.renseignerIntervention}`);
              var pathFileFacture = path.join(__dirname, `../facture/${response.facture}`);    
              var pathFileEmise = path.join(__dirname, `../paiement/${response.emise}`);    


              // functin delete alll

                            fs.unlink(pathFileEmise, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });

                            fs.unlink(pathFileDevis, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });

                            fs.unlink(pathFileBC, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });

                            fs.unlink(pathFileBE, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });

                            fs.unlink(pathFileIntervention, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });

                            fs.unlink(pathFileFacture, (err) => {
                              if(err) {
                                console.log(err);
                              }
                            });


                          // delete Affaire
                          Affaire.deleteMany({_id: { $in: affaireId[i]}})
                          .then(async(res) => {
                              // Delete Mission
                              Mission.deleteMany({numeroAffaire: { $in: response.numeroAffaire}})
                              .then((res) => {
                                  // Delete Bon Cammnade
                                  BonCommande.deleteMany({bonCommande: { $in: response.bonCommande}})
                                  .then((res) => {
                                    // Delete Intervention
                                    Intervention.deleteMany({ affaireId: { $in: affaireId[i]} })
                                      .then((res) => {
                                        // Delete Bordereau
                                        Bordereau.deleteMany({ affaireId: { $in: affaireId[i]} })
                                          .then((res) => {
                                              // delete Facture
                                              Facture.deleteMany({ affaireId: { $in: affaireId[i]} })
                                              .then((res) => {
                                                    // delete Paiement
                                                    Paiement.deleteMany({ affaireId: { $in: affaireId[i]} })
                                                    .then((res) => {
                                                      res.status(200).json({ res });
                                                    })
                                                    .catch((err) => {
                                                      res.status(200).json({ msg: err.message });
                                                    })                                            
                                              })
                                              .catch((err) => {
                                                res.status(200).json({ msg: err.message });
                                              });
                                          })
                                          .catch((err) => {
                                            res.status(200).json({ msg: err.message });
                                          });
                                      })
                                      .catch((err) => {
                                        res.status(200).json({ msg: err.message });
                                      });
                                  })
                                  .catch((err) => {
                                    res.status(200).json({ msg: err.message });
                                  });
                              })
                              .catch((err) => {
                                res.status(200).json({ msg: err.message });
                              })
                          })
                          .catch((err) => {
                            res.status(200).json({ msg: err.message });
                          });
                    
            })
            .catch((error) => {
                res.json({ msg : error.message }).status(200);
            });

        }

  } else {

    await Affaire.findById(affaireId)
    .then((response) => {

      // path files delete
      var pathFileDevis = path.join(__dirname, `../devis/${response.nameFileAffaire}`);
      var pathFileBC = path.join(__dirname, `../bonCommandes/${response.bonCommande}`);
      var pathFileBE = path.join(__dirname, `../be/${response.be}`);
      var pathFileIntervention = path.join(__dirname, `../intervention/${response.renseignerIntervention}`);
      var pathFileFacture = path.join(__dirname, `../facture/${response.facture}`);    
      var pathFileEmise = path.join(__dirname, `../paiement/${response.emise}`);    
      

      // functin delete alll

                  fs.unlink(pathFileEmise, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });

                  fs.unlink(pathFileDevis, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });

                  fs.unlink(pathFileBC, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });

                  fs.unlink(pathFileBE, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });

                  fs.unlink(pathFileIntervention, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });

                  fs.unlink(pathFileFacture, (err) => {
                    if(err) {
                      console.log(err);
                    }
                  });


                  // delete Affaire
                  Affaire.deleteOne({_id:  affaireId })
                  .then(() => {
                      // Delete Mission
                      Mission.deleteOne({ numeroAffaire: response.numeroAffaire })
                      .then(() => {
                          // Delete Bon Cammnade
                          BonCommande.deleteOne({ bonCommande: response.bonCommande })
                          .then(() => {
                            // Delete Intervention
                            Intervention.deleteOne({ affaireId: affaireId })
                              .then(() => {
                                // Delete Bordereau
                                Bordereau.deleteOne({ affaireId: affaireId })
                                  .then(() => {
                                      // delete Facture
                                      Facture.deleteOne({ affaireId: affaireId })
                                      .then(() => {
                                            // delete Paiement
                                            Paiement.deleteOne({ affaireId: affaireId })
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                              res.status(200).json({ msg: err.message });
                                            });
                                       })      
                                      .catch((err) => {
                                        res.status(200).json({ msg: err.message });
                                      });
                                  })
                                  .catch((err) => {
                                    res.status(200).json({ msg: err.message });
                                  });
                              })
                              .catch((err) => {
                                res.status(200).json({ msg: err.message });
                              });
                          })
                          .catch((err) => {
                            res.status(200).json({ msg: err.message });
                          });
                      })
                      .catch((err) => {
                        res.status(200).json({ msg: err.message });
                      })
                  })
                  .catch((err) => {
                    res.status(200).json({ msg: err.message });
                  });
            
    })
    .catch((error) => {
        res.json({ msg : error.message }).status(200);
    });
                    
  }



};

// read all affaires with mission and client
exports.readAll = async (req, res, next) => {
  // get all affaire
  const affaires = await Affaire.find().sort({ date : -1});
  res.json({ result : affaires }).status(200);

}


// Last Rapport
exports.GetLastRapport = async (req, res, next) => {
    const last = await Last.find();
    res.json({ last }).status(200);
}

// Classement Rapport
exports.ClassementRapport = async (req, res, next) => {

    const { numeroAffaire , arber } = req.body;

    await Affaire.updateMany({ numeroAffaire: numeroAffaire },{ $set : { arber: arber } })
    .then(async () => {
      res.status(200).json({ msg: "Succes" });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });


}


// Read Rapports
exports.selectRapport = async (req, res, next) => {
  const { numeroAffaire } = req.body;
    const rapports = await Rapport.find({ numeroAffaire : numeroAffaire });
    res.json({ rapports }).status(200);
}

// check Rapports Exsit or No
exports.checkRapports = async (req, res, next) => {

    var arrayRapports = new Array();
    const rapports = await Rapport.find();

    for(let i = 0; i < rapports.length; i++) {
      arrayRapports.push(rapports[i].referenceRapport);

    }
    res.json({arrayRapports}).status(200);
}

// dispaly Bon Cammande (pdf) in browser
exports.displaybc =  async (req, res) => {

  const filename = req.params.filename;
  const dirPath = path.join(__dirname, `../bonCommandes/${filename}`);

  fs.readFile(dirPath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

}


// display DEVIS (pdf) in browser
exports.displaydevis =  async (req, res) => {
  
  const filename = req.params.filename;
  const dirPath = path.join(__dirname, `../devis/${filename}`);

  fs.readFile(dirPath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

}


// Modifier Rapport
exports.ModifierRapport =  async (req, res) => {
  
  const { refRapport, missionId, numeroAffaire, i, j, index } = req.body;

  // Get index for change true to false in table Affaire
  const affaire = await Affaire.find({ numeroAffaire : numeroAffaire });
  const count = affaire[0].refRapport.indexOf(refRapport);
  affaire[0].sendRapport[count] = false;
  const send = affaire[0].sendRapport

  await Affaire.updateOne({ numeroAffaire : numeroAffaire }, { $set : { sendRapport: send } })
  .then(async() => {
    // // Get index for change true to false in table Missions
      const mission = await Mission.findById(missionId);
      mission.equipement[i].sendRapport[index] = false;

    await Mission.updateOne({ _id: missionId },{ $set : { equipement: mission.equipement } })
    .then(async () => {
      await Rapport.deleteOne({ referenceRapport: refRapport })
       .then((result) => {
          res.status(200).json({  msg: result });
       })
       .catch((err) => {
          res.status(200).json({ msg: err.message });
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

// display Intervention (pdf) in browser
exports.displayintervention =  async (req, res) => {
  
  const filename = req.params.filename;
  const dirPath = path.join(__dirname, `../intervention/${filename}`);

  fs.readFile(dirPath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

}


// Accepte reference Rapport
exports.accepterRapport =  async (req, res) => {
 
  const affaire = await Affaire.find({ numeroAffaire : req.params.numeroAffaire });
  const today = new Date();

  await Affaire.updateMany({ _id : affaire[0]._id }, { $set:{ importRapport: true, dateSendRapport : today } })
    .then(() => {
      res.status(200).json({ msg: "succès" });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};


//  Delete Accepte ref rapport  Rapport
exports.DeleteImportRapport = async (req, res) => {

  const { affaireId } = req.body;

  await Affaire.updateOne({ _id : affaireId }, {$set:{ importRapport: "false" }})
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
};

//  Delete Accepte ref rapport  Rapport
exports.getRefClientByNumeroAffaire = async (req, res) => {

  const { numeroAffaire } = req.body;
  const affaire = await Affaire.find({ numeroAffaire : numeroAffaire });
  const interlocuteur = await Interlocuteur.find({ clientId : affaire[0].clientId });

  res.json({ interlocuteurs : interlocuteur, affaire : affaire }).status(200);

};



//  Delete Accepte ref rapport  Rapport
exports.EnvoyerClientEmail = async (req, res) => {

  const { checkedInterlocuteur, checkedRapport, numeroAffaire } = req.body;

  const rapport = await Rapport.find({ referenceRapport : checkedRapport[0] });

  if(checkedRapport.length == 0) {

    await Rapport.updateMany({ numeroAffaire: numeroAffaire }, { $set : { confirmation: 0, sendClient : false } })
      .then(() => {
          res.status(200).json({ msg: "L'activation du rapport a été supprimée"});
      })
      .catch((err) => {
          res.status(200).json({ msg: err.message });
      });

  } 

  if(checkedRapport.length == 1) {

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: SECRET_ID,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      }
    });

    // point to the template folder
    const filePath = path.join(__dirname, "/views/addOne.html");
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    // use a template file with nodemailer
    const template = handlebars.compile(source);
    const replacements = {
            img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png",
            referenceRapport : rapport[0].referenceRapport, 
            designation : rapport[0].designation,
            dateIntervention : rapport[0].dateIntervention,
            responsableClient : rapport[0].responsableClient,
            dateProductionControle : rapport[0].dateProductionControle,
            category : rapport[0].category,
    };
                
    const htmlToSend = template(replacements);

              // send mail with defined transport object
              transporter.sendMail(
                {
                  from: process.env.EMAIL, // sender address
                  to: checkedInterlocuteur[0], // list emails of receivers
                  subject: "Nous avons ajouté un document à votre compte GTHCLIENT", // Subject line
                  html:htmlToSend,
                },
                async (error, response) => {
                  if (error) {
                    res.json({ msg: error }).status(200);
                  } else {
                    await Rapport.updateMany({ numeroAffaire: numeroAffaire },{ $set : { confirmation: 0, sendClient : false } })
                    .then(async () => {
                        await Rapport.updateMany({ referenceRapport: checkedRapport[0] },{ $set : { confirmation: 1, sendClient : true } })
                        .then(() => {
                          res.status(200).json({ msg: "Téléchargé avec succès"});
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
    }          

  if(checkedRapport.length > 1) {

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: SECRET_ID,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });
      
        // point to the template folder
        const filePath = path.join(__dirname, "/views/addAll.html");
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        // use a template file with nodemailer
        const template = handlebars.compile(source);
        const replacements = {
              img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png"
        };
        
        const htmlToSend = template(replacements);

        transporter.sendMail(
          {
            from: EMAIL, // sender address
            to: checkedInterlocuteur, // list of receivers
            subject: "Nous avons ajouté un document à votre compte GTHCLIENT", // Subject line
            html: htmlToSend,
          },
          async (error, response) => {
            if (error) {
              res.json({ msg: error }).status(200);
            } else {

              await Rapport.updateMany({ numeroAffaire: numeroAffaire },{ $set : { confirmation: 0, sendClient : false } })
              .then(async () => {
                    await Rapport.updateMany({ referenceRapport: checkedRapport },{ $set : { confirmation: 1, sendClient : true } })
                    .then(() => {
                      res.status(200).json({ msg: "Téléchargé avec succès"});
                    })
                    .catch((err) => {
                      res.status(200).json({ msg: err.message });
                    });
              })
              .catch((err) => {
                res.status(200).json({ msg: err.message });
              });

            }

          }
        );

    }



};


// Delete Bon Cammande and file 
exports.DeleteBonCammande =  async (req, res) => {


  const { affaireId } = req.body;
 
  const affaire = await Affaire.findById(affaireId);

  // get position file
  var tempFilePath = path.join(__dirname, `../bonCommandes/${affaire.bonCommande}`);
  // delete file named 'sample.txt'
  fs.unlink(tempFilePath, async (err) => {
        if (err) {
          res.status(200).json({ msg : err.message });
        } else {
          BonCommande.deleteOne({ bonCommande : affaire.bonCommande})
          .then(async() => {
              await Affaire.findByIdAndUpdate(affaireId, { $set: { bonCommande : "false" } })
              .then(() => {
                res.status(200).json({ msg: "succes" });
              })
              .catch((err) => {
                res.status(200).json({ msg: err.message });
              });
          })
          .catch((err) => {
            res.status(200).json({ msg : err.message });
          });
        }
  });



};






