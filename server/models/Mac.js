const mongoose = require("mongoose");
const MacSchema = new mongoose.Schema({

  address: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now
  }

});

const Mac = mongoose.model("Mac", MacSchema);
module.exports = Mac;