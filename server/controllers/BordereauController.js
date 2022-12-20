const Bordereau = require("../models/Bordereau");
const Affaire = require("../models/Affaire");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");



// create BD
exports.create = async (req, res, next) => {

    const {
      numeroBD,
      refClient,
      numeroAffaire,
      missions,
      dateEnvoi,
      dateRecu,
      raisonSocial,
      adresse,
      telephone,
      adresseEnvoi,
      numeroBC,
      numeroICE,
      dateCreation,
      affaireId
    } = req.body;


    const bordereau = await Bordereau({
        numeroBD: numeroBD,
        refClient: refClient,
        numeroAffaire: numeroAffaire,
        missions: missions,
        dateEnvoi: dateEnvoi,
        dateRecu: dateRecu,
        raisonSocial: raisonSocial,
        adresse: adresse,
        telephone: telephone,
        adresseEnvoi: adresseEnvoi,
        numeroBC: numeroBC,
        numeroICE: numeroICE,
        dateCreation: dateCreation,
        affaireId: affaireId
    }).save();


    var codeMissions = " "
    missions.forEach((element) => {
      codeMissions = codeMissions + `${element.codeMission}  `;
    });



    var items = new Array();
    const objEquipement = [];

    for(let i = 0; i < missions.length; i++) {

        for(let j = 0; j < missions[i].equipement.length; j++) {
          objEquipement.push(missions[i].equipement[j].titre)
        }

      items.push({ num : i + 1, typeMission : missions[i].typeMission, equipement : [].concat(objEquipement), qte : missions[i].qte });
      objEquipement.splice(0, objEquipement.length);
    }
    

    // Load the docx file as binary content
    const content = fs.readFileSync(
        path.resolve(__dirname, "../be/be.docx"),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({
        items : items,
        numeroBD: numeroBD,
        refClient: refClient,
        numeroAffaire: numeroAffaire,
        codeMissions: codeMissions,
        dateEnvoi: dateEnvoi,
        dateRecu: dateRecu,
        raisonSocial: raisonSocial,
        adresse: adresse,
        telephone: telephone,
        adresseEnvoi: adresseEnvoi,
        numeroBC: numeroBC,
        numeroICE: numeroICE,
        dateCreation: dateCreation,
        affaireId: affaireId
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    
    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, `../be/${bordereau._id}.docx`), buf);

   
      await Affaire.findByIdAndUpdate(affaireId, { $set: { be : `${bordereau._id}.docx` } })
      .then(() => {
        res.status(200).json({ msg: "succes" });
      })
      .catch((err) => {
        res.status(200).json({ msg: err.message });
      });
  
  };

// get Last BD
exports.getLastBD = async (req, res, next) => {

    const bordereaus =  await Bordereau.find().sort({ date : -1});
    res.json({ bordereaus }).status(200);

};


// show BD
exports.showBE = async (req, res, next) => {

  const filename = req.params.be;
  var tempFilePath = path.join(__dirname, `../be/${filename}`);

  res.download(tempFilePath, function(err){
    if (err) {
      // if the file download fails, we throw an error
      throw err;
    }
  })

};

// Read all Bordereaus
exports.readAllBordereaus = async (req, res, next) => {
  const bordereaus = await Bordereau.find();
  res.status(200).json({bordereaus})
}


// Delete Bordereaus
exports.deleteBD = async (req, res, next) => {

  const {affaireId, numeroAffaire, be } = req.body;

  const bordereau = await Bordereau.findOne({ numeroAffaire : numeroAffaire });
  // get position file
  var tempFilePath = path.join(__dirname, `../be/${be}`);
  // delete file named 'sample.txt'
  fs.unlink(tempFilePath, async (err) => {
        if (err) {
          res.status(200).json({ msg : err.message });
        } else {
          Bordereau.findByIdAndRemove(bordereau._id)
          .then(async() => {
              await Affaire.findByIdAndUpdate(affaireId, { $set: { be : "false" } })
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

}


// Delete Bordereaus with filename
exports.DeleteBDWithoutFilenameBE = async (req, res, next) => {

  const {affaireId, numeroAffaire } = req.body;

  const affaire = await Affaire.findById(affaireId);
  const bordereau = await Bordereau.findOne({ numeroAffaire : numeroAffaire });
  
  // get position file
  var tempFilePath = path.join(__dirname, `../be/${affaire.be}`);
  // delete file named 'sample.txt'
  fs.unlink(tempFilePath, async (err) => {
        if (err) {
          res.status(200).json({ msg : err.message });
        } else {
          Bordereau.findByIdAndRemove(bordereau._id)
          .then(async() => {
              await Affaire.findByIdAndUpdate(affaireId, { $set: { be : "false" } })
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

}

// Delete Bordereaus Envoi
exports.DeleteImportRapportandBE = async (req, res, next) => {

  const { affaireId } = req.body;

  const affaire = await Affaire.findById(affaireId);
  const bordereau = await Bordereau.findOne({ numeroAffaire : affaire.numeroAffaire });
  // get position file
  var tempFilePath = path.join(__dirname, `../be/${affaire.be}`);
  // delete file named 'sample.txt'
  fs.unlink(tempFilePath, async (err) => {
        if (err) {
          res.status(200).json({ msg : err.message });
        } else {
          Bordereau.findByIdAndRemove(bordereau._id)
          .then(async() => {
              await Affaire.findByIdAndUpdate(affaireId, { $set: { be : "false" } })
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

}