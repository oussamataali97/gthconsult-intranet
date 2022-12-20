const Mission = require("../models/Mission");
const Last = require("../models/Last");

// create Mission
exports.create = async (req, res, next) => {

  // get last reference Rapport
  const last = await Last.find();

  const {
        typeMission,
        codeMission,
        equipement,
        qte,
        prix,
        devis,
        interlocuteurId,
        clientId,
        numeroAffaire,
        status,
        statusWithAffaire,
        typeRapport,
        categorie
  } = req.body;

  const data = new Array();
  const numRapport = new Array();

  // somme value array
    var sommeCountRapport = qte.reduce(function(a, b){
      return parseInt(a) + parseInt(b);
    }, 0);

    // init info data and info scte
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var nomSociete = numeroAffaire.substr(13);

    // get count
    const count = last[0].LastRapport.slice(
        last[0].LastRapport.indexOf('A') + 1,
        last[0].LastRapport.lastIndexOf('|'),
    );
    // stocke les ref rapport  
    for(let i = 0; i < sommeCountRapport; i++) {
          numRapport.push('RA'+ (parseInt(count) + (i + 1)) + '|' + mm + '|' + yyyy + "|" + nomSociete);
    }

    // Tres Important :La méthode values() renvoie un nouvel objet Array Iterator
    var iterateur = numRapport.values();

    for(let i = 0; i < equipement.length; i++) {
      
      const stock = new Array();
      const countRappot = parseInt(qte[i]);

      var middelwareValue = new Array;
      var middelwareValueSend = new Array;

      for(let j = 0; j < countRappot; j++) {
       stock[j] = iterateur.next().value;
       middelwareValue[j] = stock[j];
       middelwareValueSend[j] = false;
      }

      data.push({ titre : equipement[i], quantite : qte[i], refRapport : middelwareValue, sendRapport : middelwareValueSend });

      // delete array
      stock.splice(0, stock.length);

    }


  
  await Mission({
    typeMission: typeMission,
    codeMission: codeMission,
    equipement: data,
    qte: qte,
    prix: prix,
    devis :devis,
    interlocuteurId: interlocuteurId,
    clientId: clientId,
    numeroAffaire : numeroAffaire,
    status: status,
    statusWithAffaire :statusWithAffaire,
    typeRapport : typeRapport,
    categorie : categorie
  })
    .save()
    .then(async (result) => {
      if(result) {
          const last = await Last.findOne();
          const lastRapportId = last._id;

          await Last.findByIdAndUpdate(lastRapportId, { $set: { LastRapport : numRapport[numRapport.length - 1]} })
          .then(() => {
            res.status(200).json({ data: result, msg : "succes" });
          })
          .catch((err) => {
              res.status(200).json({ data: err.message, msg : "echec" });
          });
      }
    })
    .catch((err) => {
      res.status(200).json({ data: err.message, msg : "echec" });
    });
};

// read Mission
exports.read = async (req, res, next) => {
  const missions = await Mission.find();
  await res.status(200).json({ missions });
};


// Annuler Affaire After Create Mission
exports.AnnulerAffaireAfterCreateMission = async (req, res, next) => {
  const { numeroAffaire } = req.body;
   await Mission.deleteMany({ numeroAffaire : numeroAffaire })
   .then((result) => {
      res.status(200).json({ msg : result });
   })
   .catch((error) => {
      res.status(200).json({ msg : error.message });
   });
};

// update Mission
exports.update = async (req, res, next) => {
  let mid = req.params.mid;
  // info update
  const {
    typeMission,
    codeMission,
    equipement,
    qte,
    prix,
    devis,
    interlocuteurId,
    clientId,
    numeroAffaire,
    status    
} = req.body;

  let missionInfo = {
    typeMission,
    codeMission,
    equipement,
    qte,
    prix,
    devis,
    interlocuteurId,
    clientId,
    numeroAffaire,
    status    
  };

  await Mission.findByIdAndUpdate(mid, { $set: missionInfo })
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

// select one client
exports.select = async (req, res, next) => {
  let mid = req.params.mid;
  const mission = await Mission.findById(mid);
  res.status(200).json({ mission });
};

// Delete Client
exports.delete = async (req, res, next) => {

  // params
  let mid = req.params.mid;
  let countRapport = req.params.countRapport;

  // get last refrence rapport 
  const last = await Last.find();

  // get count spec
  var count = last[0].LastRapport.substring(
    last[0].LastRapport.lastIndexOf("A") + 1, 
    last[0].LastRapport.lastIndexOf("|")
);

// change type integer for calcule
var countInt = parseInt(count);
var countRapportInt = parseInt(countRapport);

const valueReplace = countInt - countRapportInt;

// old refe rapport
let oldRefRapport = last[0].LastRapport.replace(countInt.toString(), valueReplace.toString());

  // delete mission
  await Mission.findByIdAndRemove(mid)
    .then(async() => {

          // old refernce Rapport
          await Last.findByIdAndUpdate("62fb83321e45146a2dd26461", { $set: { LastRapport : oldRefRapport} })
          .then(() => {
            res.status(200).json({ msg: "La mission a été supprimé avec succès" });
          })
          .catch((err) => {
              res.status(200).json({ data: err.message, msg : "echec" });
          });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};

// Delete missions Not Complete
exports.deleteAffaireNotComplete = async (req, res, next) => {
  let mid = req.params.mid;

  await Mission.deleteMany({ numeroAffaire : mid })
    .then(() => {
      res.status(200).json({ msg: "Les mission not complete a été supprimé avec succès" });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};


// send message client
exports.send = async (req, res, next) => {};

// Get 
exports.getMission = async (req, res, next) => {
  
  let numeroAffaire = req.params.mid;

  const missions = await Mission.find({ numeroAffaire : numeroAffaire});
  await res.status(200).json({ missions });
};
