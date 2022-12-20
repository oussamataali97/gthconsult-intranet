const Admin = require("../models/Admin");
const SousTraitance = require("../models/SousTraitance")

// Create Sous traitance
exports.create = async (req, res, next) => {

    const { 
        formJuridique,
        ville,
        codePostal,
        pays,
        email,
        ice,
        telephone,
        service,
        raisonSocial
        } = req.body.sousTraitance;


        await SousTraitance({
            raisonSocial : raisonSocial, 
            formJuridique : formJuridique, 
            ville : ville, 
            codePostal : codePostal, 
            pays : pays, 
            email : email, 
            ice : ice, 
            telephone : telephone, 
            service : service
        }).save()
        .then((result) => {
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });
};

// Update Sous traitance
exports.update = async (req, res, next) => {
    // content
    const { 
         id,
         formJuridique,
         ville,
         codePostal,
         pays,
         email,
         ice,
         telephone,
         service,
         raisonSocial
        } = req.body.sousTraitance;
    

    // id Sous Traitance
    const sousTraitanceId = req.body.sousTraitanceId; 
    
    await SousTraitance.updateOne({ _id : sousTraitanceId }, { $set : { 
            raisonSocial : raisonSocial, 
            formJuridique : formJuridique, 
            ville : ville, 
            codePostal : codePostal, 
            pays : pays, 
            email : email, 
            ice : ice, 
            telephone : telephone, 
            service : service
        }})
        .then(async(result) => {
           res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });
};


// Read Sous traitance
exports.read = async (req, res, next) => {
    await SousTraitance.find()
    .then((result) => {
        res.json({ sousTraitances : result}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};


// Select Sous traitance
exports.select = async (req, res, next) => {

    const sousTraitance = await SousTraitance.findById(req.body.sousTraitanceId);
    res.json({ sousTraitance : sousTraitance}).status(200);

};


// Delete Sous traitance
exports.delete = async (req, res, next) => {
    await SousTraitance.deleteMany({ _id : req.body.sousTraitanceId })
    .then(async() => {

        await Admin.deleteMany({ sousTraitanceId : req.body.sousTraitanceId })
        .then(async(result)=> {
            res.json({ msg : "succes", result : result }).status(200);
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });

    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};
