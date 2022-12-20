const Facture = require("../models/Facture");
const Paiement = require("../models/Paiement");
const Affaire = require("../models/Affaire");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");




// Indecateur
exports.Indicateur = async (req, res, next) => {

  const { annee } = req.body;
  // get last day in Fevrier by year
  const lastDay =  new Date(annee, 2, 0).getDate();


  // Start Janvier
  const janvier = await Facture.find({"facturation": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
  const paiementJan = await Paiement.find({"date": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
  const attenteJan = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});
  const emiseJan = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-01-01`), $lt:new Date(`${annee}-01-31`) }});


  const factureJanvier = janvier.length;
  const paiementJanvier = paiementJan.length;
  const attenteJanvier = attenteJan.length;
  const emiseJanvier = emiseJan.length;
  // End Janvier

  // Start fevrier
  const fevrier = await Facture.find({"facturation": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
  const paiementFev = await Paiement.find({"date": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
  const attenteFev = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});
  const emiseFev = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-02-01`), $lt:new Date(`${annee}-02-${lastDay}`) }});

  const factureFevrier = fevrier.length;
  const paiementFevrier = paiementFev.length;
  const attenteFevrier = attenteFev.length;
  const emiseFevrier = emiseFev.length;

  // End fevrier

  // Start mars
  const mars = await Facture.find({"facturation": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
  const paiementMar = await Paiement.find({"date": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
  const attenteMar = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});
  const emiseMar = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-03-01`), $lt:new Date(`${annee}-03-31`) }});


  const factureMars = mars.length;
  const paiementMars = paiementMar.length;
  const attenteMars = attenteMar.length;
  const emiseMars = emiseMar.length;

  // End mars

  // Start avril
  const avril = await Facture.find({"facturation": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
  const paiementAvr = await Paiement.find({"date": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
  const attenteAvr = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});
  const emiseAvr = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-04-01`), $lt:new Date(`${annee}-04-30`) }});

  const factureAvril = avril.length;
  const paiementAvril = paiementAvr.length;
  const attenteAvril = attenteAvr.length;
  const emiseAvril = emiseAvr.length;

  // End avril


  // Start mai
  const mai = await Facture.find({"facturation": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
  const paiementMa = await Paiement.find({"date": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
  const attenteMa = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});
  const emiseMa = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-05-01`), $lt:new Date(`${annee}-05-31`) }});

  const factureMai = mai.length;
  const paiementMai = paiementMa.length;
  const attenteMai = attenteMa.length;
  const emiseMai = emiseMa.length;

  // End mai

  // Start Juin
  const juin = await Facture.find({"facturation": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
  const paiementJui = await Paiement.find({"date": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
  const attenteJui = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});
  const emiseJui = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-06-01`), $lt:new Date(`${annee}-06-30`) }});

  const factureJuin = juin.length;
  const paiementJuin = paiementJui.length;
  const attenteJuin = attenteJui.length;
  const emiseJuin = emiseJui.length;

  // End Juin

  // Start juillet
  const juillet = await Facture.find({"facturation": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
  const paiementJuil = await Paiement.find({"date": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
  const attenteJuil = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});
  const emiseJuil = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-07-01`), $lt:new Date(`${annee}-07-31`) }});


  const factureJuillet = juillet.length;
  const paiementJuillet = paiementJuil.length;
  const attenteJuillet = attenteJuil.length;
  const emiseJuillet = emiseJuil.length;

  // End juillet

  // Start aout
  const aout = await Facture.find({"facturation": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
  const paiementAou = await Paiement.find({"date": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
  const attenteAou = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});
  const emiseAou = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-08-01`), $lt:new Date(`${annee}-08-31`) }});

  const factureAout = aout.length;
  const paiementAout = paiementAou.length;
  const attenteAout = attenteAou.length;
  const emiseAout = emiseAou.length;

  // End aout
  
  // Start septembre
  const septembre = await Facture.find({"facturation": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
  const paiementSep = await Paiement.find({"date": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
  const attenteSep = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
  const emiseSep = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});

  const factureSeptembre = septembre.length;
  const paiementSeptembre = paiementSep.length;
  const attenteSeptembre = attenteSep.length;
  const emiseSeptembre = emiseSep.length;

  // End septembre

  // Start october
  const october = await Facture.find({"facturation": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
  const paiementOct = await Paiement.find({"date": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
  const attenteOct = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});
  const emiseOct = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-10-01`), $lt:new Date(`${annee}-10-30`) }});

  const factureOctober = october.length;
  const paiementOctober = paiementOct.length;
  const attenteOctober = attenteOct.length;
  const emiseOctober = emiseOct.length;

  // End october

  // Start novembre
  const novembre = await Facture.find({"facturation": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
  const paiementNov = await Paiement.find({"date": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
  const attenteNov = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});
  const emiseNov = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-11-01`), $lt:new Date(`${annee}-11-30`) }});


  const factureNovembre = novembre.length;
  const paiementNovembre = paiementNov.length;
  const attenteNovembre = attenteNov.length;
  const emiseNovembre = emiseNov.length;

  // End novembre

  // Start novembre
  const decembre = await Facture.find({"facturation": { $gte:new Date(`${annee}-12-01`), $lt:new Date(`${annee}-12-31`) }});
  const paiementDec = await Paiement.find({"date": { $gte:new Date(`${annee}-12-01`), $lt:new Date(`${annee}-12-30`) }});
  const attenteDec = await Affaire.find({"dateBE": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});
  const emiseDec = await Affaire.find({"dateFacture": { $gte:new Date(`${annee}-09-01`), $lt:new Date(`${annee}-09-30`) }});


  const factureDecembre = decembre.length;
  const paiementDecembre = paiementDec.length;
  const attenteDecembre = attenteDec.length;
  const emiseDecembre = emiseDec.length;

  // End novembre


   res.json({ factureJanvier, paiementJanvier, attenteJanvier, emiseJanvier, factureFevrier, paiementFevrier, attenteFevrier, emiseFevrier,  factureMars, paiementMars, attenteMars, emiseMars, factureAvril, paiementAvril, attenteAvril, emiseAvril, factureMai, paiementMai, attenteMai, emiseMai, factureJuin, paiementJuin, attenteJuin, emiseJuin, factureJuillet, paiementJuillet, attenteJuillet, emiseJuillet, factureAout, paiementAout, attenteAout, emiseAout, factureSeptembre, paiementSeptembre, attenteSeptembre, emiseSeptembre,  factureOctober, paiementOctober, attenteOctober, emiseOctober, factureNovembre, paiementNovembre, attenteNovembre, emiseNovembre, factureDecembre, paiementDecembre, attenteDecembre, emiseDecembre }).status(200);

}

// create FACTURE
exports.create = async (req, res, next) => {

 const {
    adresse,
    adresseEnvoi,
    affaireId,
    dateCreation,
    echeance,
    facturation,
    missions,
    numeroAffaire,
    numeroBC,
    numeroFACTURE,
    numeroICE,
    prixLettre,
    prixTotalHT,
    prixTotalTTC,
    raisonSocial,
    refClient,
    telephone,
    tva
 } = req.body;

 const facture = await Facture({
    adresse : adresse,
    adresseEnvoi : adresseEnvoi,
    affaireId : affaireId,
    dateCreation : dateCreation,
    echeance : echeance,
    facturation : facturation,
    missions : missions,
    numeroAffaire : numeroAffaire,
    numeroBC : numeroBC,
    numeroFACTURE : numeroFACTURE,
    numeroICE : numeroICE,
    prixLettre : prixLettre,
    prixTotalHT : prixTotalHT,
    prixTotalTTC : prixTotalTTC,
    raisonSocial : raisonSocial,
    refClient : refClient,
    telephone : telephone,
    tva : tva
    }).save();


    var codeMissions = " "
    missions.forEach((element) => {
      codeMissions = codeMissions + `${element.codeMission}  `;
    });

    var items = new Array();

    missions.forEach((element, index) => {

        var sumQuantite = 0;
        for(let i = 0; i < element.qte.length; i++) {
          sumQuantite = sumQuantite + parseInt(element.qte[i]);
        }


        items.push({
            num : index + 1,
            typeMission : element.typeMission,
            unite : "1/Unite",
            qte : sumQuantite,
            prixHT : element.prix,
            prixTotalHT : sumQuantite * element.prix,
            devis : element.devis
        })
    });

    // Load the docx file as binary content
    const content = fs.readFileSync(
        path.resolve(__dirname, "../facture/facture.docx"),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({
        items : items,
        adresse : adresse,
        adresseEnvoi : adresseEnvoi,
        affaireId : affaireId,
        dateCreation : dateCreation,
        echeance : echeance,
        facturation : facturation,
        codeMissions : codeMissions,
        numeroAffaire : numeroAffaire,
        numeroBC : numeroBC,
        numeroFACTURE : numeroFACTURE,
        numeroICE : numeroICE,
        prixLettre : prixLettre,
        prixTotalHT : prixTotalHT,
        prixTotalTTC : prixTotalTTC,
        raisonSocial : raisonSocial,
        refClient : refClient,
        telephone : telephone,
        tva : tva,
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    
    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, `../facture/${facture._id}.docx`), buf);
        const today = new Date();
        await Affaire.findByIdAndUpdate(affaireId, { $set: { facture : `${facture._id}.docx`, dateFacture : today } })
        .then(() => {
          res.status(200).json({ msg: "succes" });
        })
        .catch((err) => {
          res.status(200).json({ msg: err.message });
        });

  };

// get Last FACTURE
exports.getLastFACTURE = async (req, res, next) => {

    const factures =  await Facture.find().sort({ date : -1, limit: 1});
    res.json({ factures }).status(200);
    
};

// show BD
exports.showFACTURE = async (req, res, next) => {

  const filename = req.params.facture;
  var tempFilePath = path.join(__dirname, `../facture/${filename}`);
  res.download(tempFilePath, function(err){
    if (err) {
      // if the file download fails, we throw an error
      throw err;
    }
})

};


exports.readAllFactures = async (req, res, next) => {
  const factures = await Facture.find();
  res.status(200).json({factures})
}