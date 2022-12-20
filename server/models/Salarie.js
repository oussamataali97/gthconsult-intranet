const mongoose = require("mongoose");
const SalarieSchema = new mongoose.Schema({

    adresse : {
        type: String,
        required: false
    },

    banque : {
        type: String,
        required: false
    },

    cnss : {
        type: String,
        required: false
    },

    dateEmbauche : {
        type: Date,
        required: false
    },

    dateQuitter : {
        type: String,
        required: false
    },

    email : {
        type: String,
        required: false
    },

    identite : {
        type: String,
        required: false
    },

    matricule : {
        type: String,
        required: false
    },

    niveauEtude : {
        type: String,
        required: false
    },

    nom : {
        type: String,
        required: false
    },

    pays : {
        type: String,
        required: false
    },

    poste : {
        type: String,
        required: false
    },

    prenom : {
        type: String,
        required: false
    },

    rip : {
        type: String,
        required: false
    },

    telephone : {
        type: String,
        required: false
    },

    typeContart : {
        type: String,
        required: false
    },

    typeQuitter : {
        type: String,
        required: false
    },

    ville : {
        type: String,
        required: false
    },

    cin : {
        type: String,
        required: false
    },

    diplome : {
        type: String,
        required: false
    },

    photo : {
        type: String,
        required: false
    },

    autres : {
        type: String,
        required: false
    },

    medical : {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


const Salarie = mongoose.model("Salarie", SalarieSchema);
module.exports = Salarie;