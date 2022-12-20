const Last = require("../models/Last");


exports.read = async (req, res, next) => {
    const lastRef = await Last.find();
    res.json({ lastRef }).status(200);
};

exports.updateLastRapport = async (req, res, next) => {

    const { lastrapportId } = req.body

    const lastrapport = await Last.find();
    await Last.findByIdAndUpdate(lastrapport._id, { $set: { LastRapport : lastrapportId} })
    .then(() => {
      res
        .status(200)
        .json({
          msg: "succès",
        });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });


};

exports.updateLastAffaire = async (req, res, next) => {
  
    const { lastaffaireId } = req.body

    const lastaffaire = await Last.find();
    await Last.findByIdAndUpdate(lastaffaire._id, { $set: { LastAffaire : lastaffaireId} })
    .then(() => {
      res
        .status(200)
        .json({
          msg: "succès",
        });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    });

};