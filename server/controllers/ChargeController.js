const Charge = require("../models/Charge");

// Read charge
exports.read = async (req, res, next) => {
    await Charge.find()
    .then((result) => {
        res.json({ charges : result}).status(200);
    })
    .catch((error) => {
        res.status(200).json({ msg : "echec", result : error.message });
    });
};


// Select charge
exports.select = async (req, res, next) => {
    const charge = await Charge.findById(req.body.chargeId);
    res.json({ charge : charge}).status(200);
};
