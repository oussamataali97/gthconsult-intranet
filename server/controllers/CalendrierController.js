const Calendrier = require("../models/Calendrier");
const Admin = require("../models/Admin");
const Agenda = require("../models/Agenda");
const SousTraitance = require("../models/SousTraitance");
const { EMAIL, CLIENT_ID, SECRET_ID, REFRESH_TOKEN   } = require('../config');
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
OAuth2_client.setCredentials({ refresh_token : REFRESH_TOKEN })
const accessToken = OAuth2_client.getAccessToken();




// sauvgarder Calendrier
exports.sauvgarderCalendrier = async (req, res, next) => {

    // request body
    const {
        client,
        countInput,
        disabled,
        flagSauvgarder,
        horaire,
        inspecteur,
        lieu,
        titre,
        valider,
        mois,
        matricule,
        jour,
        number,
        annee
    } = req.body;

    // save data in calendrier
    await Calendrier({
        client: client,
        countInput: countInput,
        disabled: disabled,
        flagSauvgarder: flagSauvgarder,
        horaire: horaire,
        inspecteur: inspecteur,
        lieu: lieu,
        titre: titre,
        valider: valider,
        mois: mois,
        matricule: matricule,
        jour: jour,
        number: number,
        annee: annee
    }).save()
    .then(async(response) => {
    

    // Get reference mission    
     const refMission = response._id;
    //find who existe that mounth oui or no
     const AgendaExist = await Agenda.findOne({ $and: [{ "mois": response.mois, "annee": response.annee, "number": number }] });
     // check exist agenda or no for create 
     if(AgendaExist == null) {
        await Agenda({
            number : response.number,
            mois: response.mois,
            annee: response.annee,
            listCalendrier: response
        }).save()
        .then(async() => {
            // check marticule (envoyeur) defferent (recepteur) for no d ont send self
            if(matricule != inspecteur[0].name) {

                // find inspecteur for get email 
                var user = await Admin.findById(inspecteur[0].name);
                var email = null;
                var nom = null;
                var prenom = null;

                if(user != null) {
                     email = user.email;
                     nom = user.nom;
                     prenom = user.prenom;
                } else {

                     email = "service.supports@gthconsult.ma";
                     var sousTraitance = await SousTraitance.findById(inspecteur[0].name);
                     nom = sousTraitance.nomSousTraitance;
                     prenom = "";
   
                }


                // send message inspecteur email
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
                const filePath = path.join(__dirname, "/views/validerPlan.html");
                const source = fs.readFileSync(filePath, 'utf-8').toString();
                // use a template file with nodemailer
                const template = handlebars.compile(source);
                const replacements = {

                        img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png",
                        client: client,
                        start: horaire[0].start,
                        fin: horaire[0].fin,
                        lieu: lieu,
                        titre: titre,
                        mois: mois,
                        matricule: matricule,
                        jour: jour,
                        number: (number + 1),
                        annee: annee,
                        nom: nom,
                        prenom: prenom,
                        refMission : refMission
                };
                
                const htmlToSend = template(replacements);

               // send mail with defined transport object
               transporter.sendMail({
                from: EMAIL, // sender address
                to: email, // list of receivers
                subject: `GTHCONSULT: Mission a été programmée Réf:${refMission}`, // Subject line
                html: htmlToSend,
                }, (error, response) => {
                    if(error) {
                        res.json({ msg: error }).status(200);
                    } else {
                        res.status(200).json({ response });
                    }

                });
            }
        })
        .catch((error) => {
            res.json({ msg : error.message }).status(200);
        });


     } 

     if(AgendaExist != null) { 
        // exist danc il faut edit la premier at ajoute un clendrier nouveau au agenda
        var newAgenda = new Array();
        newAgenda = AgendaExist;
        newAgenda.listCalendrier[newAgenda.listCalendrier.length] = response;
        const newlistCalendrier = newAgenda.listCalendrier;

        await Agenda.findByIdAndUpdate(AgendaExist._id, { $set: { listCalendrier : newlistCalendrier } })
        .then(async() => {
                        // check marticule (envoyeur) defferent (recepteur) for no d ont send self
                        if(matricule != inspecteur[0].name) {
                            // find inspecteur for get email 
                            var user = await Admin.findById(inspecteur[0].name);
                            var email = null;
                            var nom = null;
                            var prenom = null;

                            if(user != null) {
                                email = user.email;
                                nom = user.nom;
                                prenom = user.prenom;
                            } else {

                                email = "service.supports@gthconsult.ma";
                                var sousTraitance = await SousTraitance.findById(inspecteur[0].name);
                                nom = sousTraitance.nomSousTraitance;
                                prenom = "";
            
                            }

                            // send message inspecteur email
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
                            const filePath = path.join(__dirname, "/views/validerPlan.html");
                            const source = fs.readFileSync(filePath, 'utf-8').toString();
                            // use a template file with nodemailer
                            const template = handlebars.compile(source);
                            const replacements = {
            
                                    img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png",
                                    client: client,
                                    start: horaire[0].start,
                                    fin: horaire[0].fin,
                                    lieu: lieu,
                                    titre: titre,
                                    mois: mois,
                                    matricule: matricule,
                                    jour: jour,
                                    number: (number + 1),
                                    annee: annee,
                                    nom: nom,
                                    prenom: prenom,
                                    refMission: refMission
                            };
                            
                            const htmlToSend = template(replacements);
            
                            // send mail with defined transport object
                            transporter.sendMail({
                                from: EMAIL, // sender address
                                to: email, // list of receivers
                                subject: `Une nouvelle tâche GTHCONSULT Réf:${refMission}`, // Subject line
                                html: htmlToSend,
                                }, (error, response) => {
                                    if(error) {
                                        res.json({ msg: error }).status(200);
                                    } else {
                                        res.status(200).json({ response });
                                    }

                                });
                        }
        })
        .catch((err) => {
          console.log(err.message);
        });

     }

 

    })
    .catch((error) => {
        res.json({ msg : error.message }).status(200);
    });


}


// read Calendrier
exports.Read = async (req, res, next) => {

    const {
        mois,
        annee
    } = req.body;

    await Agenda.find({ mois : mois, annee: annee })
    .then((response) => {
        res.json(response).status(200);
    })
    .catch((error) => {
        res.json({ msg : error.message }).status(200);
    });

}


// read Calendrier with Inspecteur
exports.ReadInspecteur = async (req, res, next) => {

    const {
        mois,
        annee,
        matricule
    } = req.body;


    await Calendrier.find({ mois : mois, annee: annee, inspecteur: { name : matricule} })
    .then((response) => {
        res.json(response).status(200);
    })
    .catch((error) => {
        res.json({ msg : error.message }).status(200);
    });

}

exports.DeleteCalendrier = async (req, res, next) => {

    const { val, j, index } = req.body;
    // // get id Agenda for delete after with id agenda
    const agenda = await Agenda.findOne({ "mois": val.mois, "number": val.number, "jour": val.jour, "annee" : val.annee });

    if(agenda != null) {
        // set data in array
        const calendrierId = index[j]._id;
        const agendaId = agenda._id;
        index.splice(j, 1);

        if(index.length == 0) {
            Agenda.deleteOne({ _id : agendaId })
            .then(() => {
                Calendrier.deleteOne({ _id : calendrierId })
                    .then((result) => {
                        res.status(200).json({ msg: "succes" , result : result});
                    })
                    .catch((error) => {
                        res.json({ msg : error.message }).status(200);
                    });
            })
            .catch((error) =>{
                res.json({ msg : error.message }).status(200);
            });
        } 

        if(index.length > 0) {
            Agenda.updateOne({ _id : agendaId }, { $set: { listCalendrier: index } })
            .then(() => {
                    Calendrier.deleteOne({ _id : calendrierId })
                    .then((result) => {
                        res.status(200).json({ msg: "succes" , result : result});
                    })
                    .catch((error) => {
                        res.json({ msg : error.message }).status(200);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
        } 

    }


}

exports.ValiderCalendrier = async (req, res, next) => {

    const {                 
        id,
        annee,
        mois,
        i,
        j,
        inspecteurId
     } = req.body;


    // find inspecteur for get email 
    const user = await Admin.findById(inspecteurId);
    const nom = user.nom;
    const prenom = user.prenom;

    const agenda = await Agenda.findOne({ number : i, mois : mois, annee : annee  });
    
    for(let i = 0; i < agenda.listCalendrier.length; i++) {
        if(agenda.listCalendrier[i]._id == id) {
            agenda.listCalendrier[i].valider= true;
        }
    }

    await Agenda.updateOne({ number : i, mois : mois, annee : annee  } , { $set : { "listCalendrier" : agenda.listCalendrier }})
        .then(async() => {

            await Calendrier.findByIdAndUpdate(id, { $set: { valider : true } })
            .then((response) => {
                const refMission = response._id;
                const client = response.client;
                const lieu = response.lieu;
                const titre = response.titre;
                const horaire = response.horaire;
                const mois = response.mois;
                const number = response.number;
                const annee = response.annee;
                const jour = response.jour;
                // send message inspecteur email
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
                const filePath = path.join(__dirname, "/views/confirmationClendrier.html");
                const source = fs.readFileSync(filePath, 'utf-8').toString();
                // use a template file with nodemailer
                const template = handlebars.compile(source);
                const replacements = {

                        img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png",
                        client: client,
                        start: horaire[0].start,
                        fin: horaire[0].fin,
                        lieu: lieu,
                        titre: titre,
                        mois: mois,
                        jour: jour,
                        number: (number + 1),
                        annee: annee,
                        nom: nom,
                        prenom: prenom,
                        refMission: refMission
                };
                
                const htmlToSend = template(replacements);

                // send mail with defined transport object
                transporter.sendMail({
                    from: EMAIL, // sender address
                    to: "service.clients@gthconsult.ma", // list of receivers
                    subject: `confirmation de tâche GTHCONSULT Réf:${refMission}`, // Subject line
                    html: htmlToSend,
                    }, (error, response) => {
                        if(error) {
                            res.json({ msg: error }).status(200);
                        } else {
                            res.status(200).json({ response });
                        }

                    });
            })
            .catch((err) => {
              console.log(err.message);
            });

        })
        .catch((err) => {
          console.log(err.message);
        });

}
exports.TelechargerAgenda = async (req, res, next) => {


        const { list , mois, annee, inspecteur } = await req.body;

        var filePath = `./agendas/${mois}-${annee}-${inspecteur}.docx`;
        
        if(fs.existsSync(filePath)) {
        
            fs.unlink(filePath, function (err) {
              if (err) throw err;
              console.log('File deleted!');
            });
      
          } 

            const fileTemplate = `./agendas/agendaMoisInspecteur.docx`;
            // Request
            const user = await Admin.findById(inspecteur);
            const nom = user.nom;
            const prenom = user.prenom;
            // Set Data in Array 
            // array
            var items = new Array();

            var suFake = new Array();

            list.forEach((element,index) => {
                    if(element.length > 1) {

                        for(let j = 0; j < element.length; j++) {
                            suFake.push({
                                l : element[j].lieu == null ? " " : element[j].lieu ,
                                c : element[j].client == null ? " " : element[j].client ,
                                t : element[j].titre == null ? " " : element[j].titre ,
                                hd : element[j].horaire[0].start == null ? " " : element[j].horaire[0].start ,
                                hf : element[j].horaire[0].fin == null ? " " : element[j].horaire[0].fin ,
                                em : element[j].matricule == null ? " " : element[j].matricule ,
                                s : element[j].valider == false ? 'N': "V" 
                            })
                        }

                        items.push({ 
                            num : index + 1,
                            j : element[0].jour == null ? " " : element[0].jour,
                            su : suFake
                       });

                    } else {

                        items.push({ 
                                num : index + 1,
                                j : element[0].jour == null ? " " : element[0].jour,
                                su : [
                                    { 
                                     l : element[0].lieu == null ? " " : element[0].lieu ,
                                     c : element[0].client == null ? " " : element[0].client ,
                                     t : element[0].titre == null ? " " : element[0].titre ,
                                     hd : element[0].horaire[0].start == null ? " " : element[0].horaire[0].start ,
                                     hf : element[0].horaire[0].fin == null ? " " : element[0].horaire[0].fin ,
                                     em : element[0].matricule == null ? " " : element[0].matricule ,
                                     s : element[0].valider == false ? 'N': "V" 
                                    }
                                ]
                        });
                    }
            });

   

     
     
            // Load the docx file as binary content
            const content = fs.readFileSync(fileTemplate,"binary");
            
            const zip = new PizZip(content);
            
            const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
            });
        
            doc.render({
                items : items,
                nom : nom,
                prenom : prenom,
                date : new Date().toLocaleDateString(),
                mois : mois,
                annee : annee
            });
        
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });
            

            const flagSuccesWrite = await fs.writeFileSync(filePath, buf);


            if(flagSuccesWrite == undefined) {

                res.download(filePath, (err) => {
                    if (err) {
                      throw err;
                    }
                });

            }
            
            
  
}

exports.SelectMoisDaysAnnee = async (req, res, next) => {
    
    const { annee, mois, number, matricule } = req.body;
    const calendriers = await Calendrier.find({ "number" : number, "mois" : mois, "inspecteur.name" : matricule, "annee": annee});
    res.json({ calendriers }).status(200);

}

