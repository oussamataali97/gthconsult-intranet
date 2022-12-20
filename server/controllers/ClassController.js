const Class = require("../models/Class");
const Rapport = require("../models/Rapport");

// create Class ->  Classfication Affaire
exports.EnregistrerRapportClass = async (req, res, next) => {

      const calss = await Class.findOne({numeroAffaire : req.body.numeroAffaire });

      if(calss == null) {

        const schemaClass = {
            niveauOne : null,
            niveauTow : null,
            niveauTree : null,
            niveauFour : null,
            niveauFive : null,
            disabled : false
          };

        await Class({
          numeroAffaire: req.body.numeroAffaire,
          classOne: req.body.niveauUn,
          classTow: req.body.niveauDeux,
          classTree: req.body.niveauTrois,
          classFour: req.body.niveauQuatre,
          classFive: req.body.niveauCinq,
          schemaClass : schemaClass
        })
        .save()
        .then((result) => {
          res.status(200).json({ msg : result });
        })
        .catch((err) => {
          res.status(200).json({ msg: err });
        });

      } else {
          res.status(200).json({ msg : "Malheureusement, les classfication ont déjà été déterminées" });
      }


};

// Delete Class ->  Classfication Affaire

exports.EffacerClassAffaire = async (req, res, next) => {

    const { numeroAffaire } = req.body;

    await Class.deleteOne({numeroAffaire : req.body.numeroAffaire })
    .then(async () => {
      Rapport.updateOne({ numeroAffaire : numeroAffaire }, { $unset : { classOne: 1, classTow: 1, classTree: 1, classFour: 1, classFive: 1, disabled : 1 }})
      .then(async (result) => {
        res.status(200).json({ msg: result });
      })
      .catch((error) => {
        res.status(200).json({ msg: error.message });
      });    })
    .catch((error) => {
      res.status(200).json({ msg: error.message });
    })

};




// Read Class
exports.ReadClassAffaire = async (req, res, next) => {

      const { numeroAffaire } = req.body;

      await Class.findOne({numeroAffaire : numeroAffaire })
      .then((result) => {
        res.status(200).json({ msg : result });
      })
      .catch((err) => {
        res.status(200).json({ msg: err });
      });

};

// 
exports.EnregistrerClassRapport = async (req, res, next) => {

      Rapport.updateOne({ _id : req.body.rapportId }, { $set : { classOne: req.body.classOne, classTow: req.body.classTow, classTree: req.body.classTree, classFour: req.body.classFour, classFive: req.body.classFive, disabled : true }})
      .then(async (result) => {
        res.status(200).json({ msg : result });
      })
      .catch((error) => {
          console.log(error)
      });

};


exports.DeleteClassRapport = async (req, res, next) => {

      Rapport.updateOne({ _id : req.body.rapportId }, { $unset : { classOne: 1, classTow: 1, classTree: 1, classFour: 1, classFive: 1, disabled : 1 }})
      .then(async (result) => {
        res.status(200).json({ msg : result });
      })
      .catch((error) => {
          console.log(error);
      });

};

exports.EnregistrerClassShema = async (req, res, next) => {

      const { numeroAffaire, niveauOne, niveauTow, niveauTree, niveauFour, niveauFive, index } = req.body;
      
      await Class.updateOne({ numeroAffaire : numeroAffaire }, { $push :  { schemaClass : { niveauOne : niveauOne , niveauTow : niveauTow, niveauTree : niveauTree, niveauFour : niveauFour, niveauFive : niveauFive , disabled : true, index : index } } })
      .then((result) => {
          res.status(200).json({ msg : result });
      })
      .catch((error) => {
        res.status(200).json({ msg : error.message });
      });

};

exports.DeleteClassShema = async (req, res, next) => {
    
      const { numeroAffaire, index } = req.body;

      await Class.updateOne({ numeroAffaire : numeroAffaire }, { $pull :  { schemaClass : { index : index } } })
      .then((result) => {
          res.status(200).json({ msg : result });
      })
      .catch((error) => {
        res.status(200).json({ msg : error.message });
      });
};