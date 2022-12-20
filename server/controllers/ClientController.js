const Client = require("../models/Client");
const Interlocuteur = require("../models/Interlocuteur");

// create client
exports.create = async (req, res, next) => {
  const {
    raisonSocial,
    adresse,
    ville,
    codePostal,
    pays, 
    email,
    ice,
    refClient,
    telephone
  } = req.body;


  await Client({
    raisonSocial : raisonSocial,
    adresse : adresse,
    ville : ville,
    codePostal : codePostal,
    pays : pays, 
    email : email,
    ice : ice,
    refClient : refClient,
    telephone: telephone
  })
    .save()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(200).json({ data: err });
    });
};

// Reference clients
exports.reference = async (req, res, next) => {
  const clients = await Client.find().sort( { _id : -1 } ).limit(1);
  await res.status(200).json({ clients });
};

// read clients
exports.read = async (req, res, next) => {
  const clients = await Client.find().sort({ date: -1 });
  await res.status(200).json({ clients });
};

// update client
exports.update = async (req, res, next) => {
  let cid = req.params.cid;

  // info update
  const {
    raisonSocial,
    adresse,
    ville,
    codePostal,
    pays,
    email,
    telephone,
    ice
  } = req.body;

  let clientInfo = {
    raisonSocial,
    adresse,
    ville,
    codePostal,
    pays,
    email,
    telephone,
    ice
  };

  await Client.findByIdAndUpdate(cid, { $set: clientInfo })
    .then(() => {
      res
        .status(200)
        .json({
          msg: "Les informations du compte client ont été modifiées avec succès",
        });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};

// select one client
exports.select = async (req, res, next) => {
  let cid = req.params.cid;
  const client = await Client.findById(cid);
  res.status(200).json({ client });
};

// select one client with Interlocuteurs
exports.selectInterlocuteurs = async (req, res, next) => {
  let cid = req.params.cid;
  const client = await Client.findById(cid);
  const interlocuteurs = await Interlocuteur.find({ clientId : client._id});
  res.status(200).json({ client : client, interlocuteurs : interlocuteurs  });
};

// Delete Client
exports.delete = async (req, res, next) => {

  let { idClients } = req.body;

  await Client.deleteMany({ _id: { $in: idClients} })
    .then(async () => {

      await Interlocuteur.deleteMany({ clientId: { $in: idClients} })
      .then(() => {
        res.status(200).json({ msg: "Le compte client a été supprimé avec succès" });
      })
      .catch((error) => {
        res.status(200).json({ msg: error.message });
      })
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });
};


// send message client
exports.send = async (req, res, next) => {};
