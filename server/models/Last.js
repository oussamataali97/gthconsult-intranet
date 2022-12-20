const mongoose = require("mongoose");
const LastSchema = new mongoose.Schema({

    LastRapport: {
        type: String,
        required: false
    },

    LastAffaire: {
        type: String,
        required: false
    },
    

    date: {
        type: Date,
        default: Date.now
    },
    

});
const Last = mongoose.model("Last", LastSchema);
module.exports = Last;