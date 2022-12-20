const Mac = require("../models/Mac");

// read All admin
exports.read = async (req, res) => {

    const { macAddresse } = req.body;

    await Mac.findOne({ address :macAddresse })
    .then((result) => {

        if(result == null) {
            res.json({ res : false }).status(200);
        }
        
        if(result) {
            res.json({ res : true, msg: result }).status(200);
        }
    })
    .catch((err) => {
        if(err) {
            res.json({ res : false , msg : err.message }).status(200);
        }
    });

}


