const mongoose = require("mongoose");
const SituationSalarieSchema = new mongoose.Schema({

    matricule : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
        required: false
    },

    annee : {
        type: String,
        required: false
    },

    liste : {
        type: Array,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }

});


const SituationSalarie = mongoose.model("SituationSalarie", SituationSalarieSchema);
module.exports = SituationSalarie;