const Interlocuteur = require("../models/Interlocuteur");
const bcrypt = require('bcryptjs');
const { EMAIL, CLIENT_ID, SECRET_ID, REFRESH_TOKEN } = require('../config');
const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2
// const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
// OAuth2_client.setCredentials({ refresh_token : REFRESH_TOKEN })
// const accessToken = OAuth2_client.getAccessToken();
// const handlebars = require("handlebars");
// const path = require('path');
const fs = require('fs');


// create Interlocuteur
exports.create = async (req, res, next) => {
  const { nom, prenom, email, fonction, telephone, clientId, raisonSocial, password } = req.body;

  const pass = password

  const isMatch = await Interlocuteur.findOne({ email });

  if (!isMatch) {

      let encryptedPassword = await bcrypt.hash(password, 10);

      await Interlocuteur({
          nom: nom,
          prenom: prenom,
          email: email,
          fonction: fonction,
          telephone: telephone,
          clientId: clientId,
          raisonSocial: raisonSocial,
          password: encryptedPassword,
          pass: pass
      }).save()
          .then(() => {
            res.json({ msg: "Votre compte a été enregistré avec succès", status: "succes" }).status(200);
          })
          .catch((err) => {
              console.log(err.message);
              res.json({ msg: err.message, status: "echec" }).status(400);
          });

  } else {
      res.json({ msg: "Le compte existe déjà", status: "echec" }).status(400);
  }

};

// read Interlocuteur
exports.read = async (req, res, next) => {
  const interlocuteurs = await Interlocuteur.find();
  await res.status(200).json({ interlocuteurs });
};

// update Interlocuteur
exports.update = async (req, res, next) => {

  // info update
  const {          
    clientId,
    email,
    fonction,
    interlocuteurId,
    nom,
    password,
    prenom,
    raisonSocial,
    telephone
   } = req.body;

   let encryptedPassword = await bcrypt.hash(password, 10);

  let interlocuteurInfo = {
      clientId,
      email,
      fonction,
      nom,
      password: encryptedPassword,
      prenom,
      raisonSocial,
      telephone,
      pass : password
  };

  await Interlocuteur.findByIdAndUpdate(interlocuteurId, { $set: interlocuteurInfo })
    .then(() => {
      res
        .status(200)
        .json({
          msg: "Les informations du compte ont été modifiées avec succès",
        });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};

// select one Interlocuteur with clientId
exports.select = async (req, res, next) => {

  try {

    const { clientId } = req.body;
    const interlocuteurs = await Interlocuteur.find({ clientId : clientId});
    res.json({ interlocuteurs }).status(200);

  } catch(err) {

    res.json({ msg : err.message }).status(200);

  }

};


// get Interlocuteur with interlocuteurId
exports.get = async (req, res, next) => {

  const { interlocuteurId } = req.body;

  try {

    const interlocuteur = await Interlocuteur.findById(interlocuteurId);
    res.json({ interlocuteur }).status(200);

  } catch(err) {

    res.json({ msg : err.message }).status(200);

  }

};



// Delete Interlocuteur
exports.delete = async (req, res, next) => {
  
  let { idInterlocuteur } = req.body;

  await Interlocuteur.deleteOne({_id: { $in: idInterlocuteur}})
    .then(() => {
      res.status(200).json({ msg: "Le compte IdInterlocuteur a été supprimé avec succès" });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};


// send message Intelocuteur
exports.send = async (req, res, next) => {

          const { idInterlocuteur } = req.body

          const interlocuteur = await Interlocuteur.findById(idInterlocuteur);

          if(interlocuteur.send == true) {

                    var transporter = nodemailer.createTransport({
                      service : 'gmail',
                      auth: {
                          type :'OAuth2',
                          user: EMAIL,
                          clientId : CLIENT_ID,
                          clientSecret : SECRET_ID,
                          refreshToken : REFRESH_TOKEN,
                          accessToken : accessToken
                      }
                  });

                  // point to the template folder
                  const filePath = path.join(__dirname, "/views/register.html");
                  const source = fs.readFileSync(filePath, 'utf-8').toString();
                  // use a template file with nodemailer
                  const template = handlebars.compile(source);
                  const replacements = {
                      email: interlocuteur.email,
                      pass : interlocuteur.pass,
                      img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png"
                    };

                  const htmlToSend = template(replacements);

                      // send mail with defined transport object
                  transporter.sendMail({
                          from: EMAIL, // sender address
                          to: interlocuteur.email, // list of receivers
                          subject: "Inscription au GTHCONSULT Client", // Subject line
                          html: htmlToSend,
                      }, (error, response) => {
                          if(error) {
                              res.json({ msg: error }).status(200);
                          } else {
                              res.json({ msg: "Votre compte a été enregistré avec succès", status: "succes" }).status(200);
                          }

                      });
          } else {

                    var transporter = nodemailer.createTransport({
                        service : 'gmail',
                        auth: {
                            type :'OAuth2',
                            user: EMAIL,
                            clientId : CLIENT_ID,
                            clientSecret : SECRET_ID,
                            refreshToken : REFRESH_TOKEN,
                            accessToken : accessToken
                        }
                    });

                    // point to the template folder
                    const filePath = path.join(__dirname, "/views/register.html");
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    // use a template file with nodemailer
                    const template = handlebars.compile(source);
                    const replacements = {
                        email: interlocuteur.email,
                        pass : interlocuteur.pass,
                        img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png"
                      };

                    const htmlToSend = template(replacements);

                        // send mail with defined transport object
                    transporter.sendMail({
                            from: EMAIL, // sender address
                            to: interlocuteur.email, // list of receivers
                            subject: "Inscription au GTHCONSULT Client", // Subject line
                            html: htmlToSend,
                        }, (error, response) => {
                            if(error) {
                                res.json({ msg: error }).status(200);
                            } else {
                              Interlocuteur.updateOne({ _id : idInterlocuteur}, { $set : { send : true }}) 
                              .then(() => {
                                res.json({ msg: "Votre compte a été enregistré avec succès", status: "succes" }).status(200);
                              })
                              .catch((error) => {
                                res.json({ msg: error.message, status: "echec" }).status(200);
                              });
                            }

                        });
          }


      
};

// Invalide Interlocuteur
exports.valideInterlocuteur = async (req, res, next) => {

    const { idInterlocuteur } = req.body

    await Interlocuteur.updateOne({ _id : idInterlocuteur }, { $set : { status : true }})
    .then((result) => {
        res.status(200).json({ msg : result });
    })
    .catch((error) => {
        res.status(200).json({ err: error.message });
    });
       
};

// Invalide Interlocuteur
exports.InvalideInterlocuteur = async (req, res, next) => {

    const { idInterlocuteur } = req.body

    await Interlocuteur.updateOne({ _id : idInterlocuteur }, { $set : { status : false }})
    .then((result) => {
        res.status(200).json({ msg : result });
    })
    .catch((error) => {
        res.status(200).json({ err: error.message });
    });
       
};
