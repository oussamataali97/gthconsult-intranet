const Listday = require("../models/Listday");

exports.Sauvgarder = async (req, res, next) => {

    const {
        index,
        matricule,
        number,
        jour,
        mois,
        annee,
        client,
        lieu,
        objet,
        gasoil,
        autoroute,
        taxi,
        train,
        hotel,
        repas,
        autre,
        disabled,
        flagSauvgarder
    } = req.body

    await Listday({
        index: index,
        matricule: matricule,
        number: number,
        jour: jour,
        mois: mois,
        annee: annee,
        client: client,
        lieu: lieu,
        objet: objet,
        gasoil: gasoil,
        autoroute: autoroute,
        taxi: taxi,
        train: train,
        hotel: hotel,
        repas: repas,
        autre: autre,
        disabled: disabled,
        flagSauvgarder: flagSauvgarder
    })
    .save()
    .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
}


exports.Changer = async (req, res, next) => {

  const {
      index,
      matricule,
  } = req.body


  let listday = await Listday.findOne({number : index, matricule: matricule });


  await Listday.findByIdAndRemove(listday._id)
    .then(() => {
      res.status(200).json({ msg: "day a été supprimé avec succès" });
    })
    .catch((err) => {
      res.status(200).json({ msg: err.message });
    })
  

}




exports.SelectMois = async (req, res, next) => {

  const {
      matricule,
      mois,
      annee
  } = req.body

  await Listday.find({  annee : annee, mois : mois, matricule: matricule })
      .then((result) => {
          res.status(200).json({ result });
        })
      .catch((err) => {
          console.log(err);
      });
}