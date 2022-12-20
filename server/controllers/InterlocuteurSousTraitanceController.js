const InterlocuteurSousTraitance = require("../models/InterlocuteurSousTraitance")
const Admin = require("../models/Admin")

// Create Interlocuteur de soutritance
exports.create = async (req, res, next) => {

    const {
          nom,
          prenom,
          email,
          fonction,
          telephone,
          raisonSocial
    } = req.body.interlocuteurSousTraitance;

        await InterlocuteurSousTraitance({
            nom : nom,
            prenom: prenom,
            email : "service.supports@gthconsult.ma",
            fonction : fonction,
            telephone: telephone,
            raisonSocial : [raisonSocial.raisonSocial, raisonSocial._id]
        }).save()
        .then(async (result) => {
                await Admin({
                    nom : nom,
                    prenom: prenom,
                    email : "service.supports@gthconsult.ma",
                    status : "sous-traitance",
                    sousTraitanceId: result._id,
                }).save()
                .then((result) => {
                    res.status(200).json({ msg : "succes", result : result });
                })
                .catch((error) => {
                    res.status(200).json({ msg : "succes", result : error.message });
                });
        })
        .catch((error) => {
            res.status(200).json({ msg : "succes", result : error.message });
        });
};

// Update Fournisseur
exports.update = async (req, res, next) => {
    // content
    const {
        nom,
        prenom,
        email,
        fonction,
        telephone,
        raisonSocial
    } = req.body.interlocuteurSousTraitance;
    
    // id Fournisseur
    const interlocuteurSousTraitanceId = req.body.interlocuteurSousTraitanceId;     

    await InterlocuteurSousTraitance.updateOne({ _id : interlocuteurSousTraitanceId }, { $set : { 
        nom : nom,
        prenom: prenom,
        email : "service.supports@gthconsult.ma",
        fonction : fonction,
        telephone: telephone,
        raisonSocial : [raisonSocial.raisonSocial, raisonSocial._id]
    }})
    .then(async () => {
                await Admin.updateOne({ sousTraitanceId : interlocuteurSousTraitanceId }, { $set : { 
                    nom : nom,
                    prenom: prenom,
                    email : "service.supports@gthconsult.ma"
                }})
                .then((result) => {
                        res.status(200).json({ msg : "succes", result : result });
                })
                .catch((error) => {
                        res.status(200).json({ msg : "succes", result : error.message });
                });
    })
    .catch((error) => {
            res.status(200).json({ msg : "succes", result : error.message });
    });

};


// Read interlocuteurs SousTraitances
exports.read = async (req, res, next) => {
    await InterlocuteurSousTraitance.find()
    .then((result) => {
        res.json({ interlocuteurSousTraitances : result}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};


// Select Fournisseur
exports.select = async (req, res, next) => {
    const { interlocuteurSousTraitanceId } = req.body;
    const interlocuteurSousTraitance = await InterlocuteurSousTraitance.findById(interlocuteurSousTraitanceId);
    res.json({ interlocuteurSousTraitance : interlocuteurSousTraitance }).status(200);
};


// Delete Sous traitance
exports.delete = async (req, res, next) => {
    await InterlocuteurSousTraitance.deleteMany({ _id : req.body.interlocuteurSousTraitanceId})
    .then(async() => {

        await Admin.deleteMany({ sousTraitanceId : req.body.interlocuteurSousTraitanceId})
        .then(() => {
            res.json({ msg : "succes"}).status(200);
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });

    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};
