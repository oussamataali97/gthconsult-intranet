const Depence = require("../models/Depence");

// Read Fournisseur
exports.read = async (req, res, next) => {
    await Depence.find()
    .then((result) => {
        res.json({ depenses : result}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};


// Select Depence
exports.select = async (req, res, next) => {

    const depence = await Depence.findById(req.body.depenseId);
    res.json({ depence : depence}).status(200);

};



