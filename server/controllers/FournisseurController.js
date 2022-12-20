const Admin = require("../models/Admin");
const Fournisseur = require("../models/Fournisseur")

// Create Fournisseur
exports.create = async (req, res, next) => {

    const {
        raisonSocial,
        formJuridique,
        ville,
        codePostal,
        pays,
        email,
        ice,
        telephone,
        activite
    } = req.body.fournisseur;

        await Fournisseur({
            raisonSocial : raisonSocial, 
            formJuridique : formJuridique, 
            ville : ville, 
            codePostal : codePostal, 
            pays : pays, 
            email : email, 
            ice : ice, 
            telephone : telephone, 
            activite : activite, 
        }).save()
        .then((result) => {
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "succes", result : error.message });
        });
};

// Update Fournisseur
exports.update = async (req, res, next) => {
    // content
    const {
        raisonSocial,
        formJuridique,
        ville,
        codePostal,
        pays,
        email,
        ice,
        telephone,
        activite
    } = req.body.fournisseur;
    

    // id Fournisseur
    const fournisseurId = req.body.fournisseurId;     

    await Fournisseur.updateOne({ _id : fournisseurId }, { $set : { 
            raisonSocial : raisonSocial, 
            formJuridique : formJuridique, 
            ville : ville, 
            codePostal : codePostal, 
            pays : pays, 
            email : email, 
            ice : ice, 
            telephone : telephone, 
            activite : activite, 
        }})
        .then((result) => {
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "succes", result : error.message });
        });

};


// Read Fournisseur
exports.read = async (req, res, next) => {
    await Fournisseur.find()
    .then((result) => {
        res.json({ fournisseurs : result}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};


// Select Fournisseur
exports.select = async (req, res, next) => {

    const fournisseur = await Fournisseur.findById(req.body.fournisseurId);
    res.json({ fournisseur : fournisseur}).status(200);

};


// Delete Sous traitance
exports.delete = async (req, res, next) => {
    await Fournisseur.deleteMany({ _id : req.body.fournisseurId})
    .then(() => {
        res.json({ msg : "succes"}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};
