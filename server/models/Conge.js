const mongoose = require("mongoose");
const CongeSchema = new mongoose.Schema({
  
  adminId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: true,
  },

  history: {
    type: Array,
    required: true,
  },

  date: {
        type: Date,
        default: Date.now
  }

  
});
const Conge = mongoose.model("Conge", CongeSchema);
module.exports = Conge;