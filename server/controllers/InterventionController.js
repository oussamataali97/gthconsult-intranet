const Intervention = require("../models/Intervention");
const Affaire = require("../models/Affaire");
const BonCommande = require("../models/BonCommande");

const {
    readFile,
    writeFile,
    copyFile,
    unlink
  } = require('fs/promises');
  const path = require("path");
  const { PDFDocument } = require('pdf-lib');
  
  const fs = require("fs");

exports.create = async (req, res, next) => {
    var {
        affaireId,
        commentaire,
        refClient,
        deDate,
        aDate,
        nameInspecteur,
        chargeAffaire,
        missions,
        interlocuteurId,
        clientId,
        numeroAffaire,
        nameInterlocuteur,
        telephoneInterlocuteur,
        adresseClient,
        raisonSocial
      } = req.body;

      // fix probleme commentaire vide
      if(commentaire == null) {
        commentaire = "sans commentaire";
      }

      var textMissions = ""
      missions.forEach((element, index) => {
        textMissions = textMissions + `${(index + 1)} - ${element.typeMission}.\n`;
      });


       const intervention = await Intervention({
            affaireId: affaireId,
            commentaire: commentaire,
            refClient: refClient,
            deDate: deDate,
            aDate: aDate,
            nameInspecteur: nameInspecteur,
            chargeAffaire: chargeAffaire,
            missions: missions,
            interlocuteurId: interlocuteurId,
            clientId: clientId,
            numeroAffaire: numeroAffaire,
            nameInterlocuteur: nameInterlocuteur,
            telephoneInterlocuteur: telephoneInterlocuteur,
            adresseClient: adresseClient,
            raisonSocial: raisonSocial
        }).save();

        async function createPdf(input, output) {
          

              var d = new Date();
              var dd = String(d.getDate()).padStart(2, '0');
              var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = d.getFullYear();
              const today = `${dd}/${mm}/${yyyy}`
              
              const pdfDoc = await PDFDocument.load(await readFile(input));
              const fieldNames = pdfDoc
                .getForm()
                .getFields()
                .map((f) => f.getName());
        
              const form = pdfDoc.getForm();
              form.getTextField('date').setText(today.toString());
              form.getTextField('refClient').setText(refClient.toString());
              form.getTextField('deDate').setText(deDate.toString());
              form.getTextField('aDate').setText(aDate.toString());
              form.getTextField('nameInspecteur').setText(nameInspecteur.toString());
              form.getTextField('chargeAffaire').setText(chargeAffaire.toString());
              form.getTextField('numeroAffaire').setText(numeroAffaire.toString());
              form.getTextField('nameInterlocuteur').setText(nameInterlocuteur.toString());
              form.getTextField('telephoneInterlocuteur').setText(telephoneInterlocuteur.toString());
              form.getTextField('adresseClient').setText(adresseClient.toString());
              form.getTextField('raisonSocial').setText(raisonSocial.toString());
              form.getTextField('commentaire').setText(commentaire.toString());
              form.getTextField('missions').setText(textMissions.toString());
        
              //form.getCheckBox('Check Box7').check();
              const pdfBytes = await pdfDoc.save();
              await writeFile(output, pdfBytes);
          }

          const dirPath = path.join(__dirname, '../intervention');
           //copyFile('./intervention/output.pdf', `./intervention/output-${clientId}.pdf`);
           const flagSuccesSavedIntervention = createPdf(`${dirPath}/info-intervention.pdf`, `${dirPath}/output-${affaireId}.pdf`);
          if(flagSuccesSavedIntervention)
          {
                            
                    //  update affaire for conv false to value pdf (filename)
                    let AffaireInfo = {
                      renseignerIntervention : `output-${affaireId}.pdf`,
                    };

                    await Affaire.findByIdAndUpdate(affaireId, { $set: AffaireInfo })
                      .then(() => {
                        res
                          .status(200)
                          .json({
                            msg: "La fiche Intervention créé  avec succès",
                            intervention : intervention
                          });
                      })
                      .catch((err) => {
                        res.status(200).json({ msg: err.message });
                      });
          }
        
};



exports.DeleteIntervention = async (req, res) => {

        const { affaireId } = req.body;
        // delete Intervention
        await Affaire.findById(affaireId)
        .then(async(response) => {

                    var pathFile = path.join(__dirname, `../intervention/${response.renseignerIntervention}`);

                      fs.unlink(pathFile, async (err) => {

                        if(err) {
                            res.json({ err : err.message }).status(200);
                        } 

                        await Affaire.updateOne({ _id : affaireId }, { $set : { renseignerIntervention : "false" } })
                        .then(async() => {

                              await Intervention.deleteOne({ affaireId : affaireId })
                              .then(async() => {
                                res.status(200).json({ msg: "succès"});
                              })
                              .catch((err) => {
                                res.json({ err : err.message }).status(200);
                              });

                        })
                          .catch((error) => {
                               res.json({ err : error.message }).status(200);
                        }); 

                      })
            
                
        })
        .catch((error) => {
                 res.json({ err : error.message }).status(200);
        });
             


};

exports.Indicateur = async (req, res, next) => {

  const { annee } = req.body;
  // get last day in Fevrier by year
  const lastDay =  new Date(annee, 2, 0).getDate();

// Start Janvier
const janvier = await BonCommande.find({"date": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
const interventionJan = await Intervention.find({"date": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
const realiseJan = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});


const bcJanvier = janvier.length;
const interventionJanvier = interventionJan.length;
const realiseJanvier = realiseJan.length;
// End Janvier

// Start fevrier
const fevrier = await BonCommande.find({"date": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
const interventionFev = await Intervention.find({"date": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
const realiseFev = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});

const bcFevrier = fevrier.length;
const interventionFevrier = interventionFev.length;
const realiseFevrier = realiseFev.length;

// End fevrier

// Start mars
const mars = await BonCommande.find({"date": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
const interventionMar = await Intervention.find({"date": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
const realiseMar = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});


const bcMars = mars.length;
const interventionMars = interventionMar.length;
const realiseMars = realiseMar.length;

// End mars

// Start avril
const avril = await BonCommande.find({"date": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
const interventionAvr = await Intervention.find({"date": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
const realiseAvr = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});

const bcAvril = avril.length;
const interventionAvril = interventionAvr.length;
const realiseAvril = realiseAvr.length;

// End avril


// Start mai
const mai = await BonCommande.find({"date": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
const interventionMa = await Intervention.find({"date": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
const realiseMa = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});

const bcMai = mai.length;
const interventionMai = interventionMa.length;
const realiseMai = realiseMa.length;

// End mai

// Start Juin
const juin = await BonCommande.find({"date": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
const interventionJui = await Intervention.find({"date": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
const realiseJui = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});

const bcJuin = juin.length;
const interventionJuin = interventionJui.length;
const realiseJuin = realiseJui.length;

// End Juin

// Start juillet
const juillet = await BonCommande.find({"date": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
const interventionJuil = await Intervention.find({"date": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
const realiseJuil = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});


const bcJuillet = juillet.length;
const interventionJuillet = interventionJuil.length;
const realiseJuillet = realiseJuil.length;

// End juillet

// Start aout
const aout = await BonCommande.find({"date": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
const interventionAou = await Intervention.find({"date": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
const realiseAou = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});

const bcAout = aout.length;
const interventionAout = interventionAou.length;
const realiseAout = realiseAou.length;

// End aout

// Start septembre
const septembre = await BonCommande.find({"date": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
const interventionSep = await Intervention.find({"date": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
const realiseSep = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});

const bcSeptembre = septembre.length;
const interventionSeptembre = interventionSep.length;
const realiseSeptembre = realiseSep.length;

// End septembre

// Start october
const october = await BonCommande.find({"date": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
const interventionOct = await Intervention.find({"date": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
const realiseOct = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});

const bcOctober = october.length;
const interventionOctober = interventionOct.length;
const realiseOctober = realiseOct.length;

// End october

// Start novembre
const novembre = await BonCommande.find({"date": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
const interventionNov = await Intervention.find({"date": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
const realiseNov = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});


const bcNovembre = novembre.length;
const interventionNovembre = interventionNov.length;
const realiseNovembre = realiseNov.length;

// End novembre

// Start novembre
const decembre = await BonCommande.find({"date": { $gte:new Date(`${annee}-12-01`), $lt:new Date(`${annee}-12-31`) }});
const interventionDec = await Intervention.find({"date": { $gte:new Date(`${annee}-12-01`), $lt:new Date(`${annee}-12-30`) }});
const realiseDec = await Affaire.find({"dateSendRapport": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});

// Start December
const bcDecembre = decembre.length;
const interventionDecembre = interventionDec.length;
const realiseDecembre = realiseDec.length;
// End December

 res.json({ bcJanvier, interventionJanvier, realiseJanvier, bcFevrier , interventionFevrier, realiseFevrier, bcMars, interventionMars, realiseMars, bcAvril, interventionAvril, realiseAvril, bcMai, interventionMai, realiseMai, bcJuin, interventionJuin, realiseJuin, bcJuillet, interventionJuillet, realiseJuillet, bcAout, interventionAout, realiseAout, bcSeptembre, interventionSeptembre, realiseSeptembre, bcOctober, interventionOctober, realiseOctober,  bcNovembre, interventionNovembre, realiseNovembre,  bcDecembre, interventionDecembre, realiseDecembre }).status(200);

}
