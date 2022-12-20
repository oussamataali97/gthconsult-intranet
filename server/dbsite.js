const mongoose = require('mongoose');

const { DB_USER, DB_PASSWORD } = require('./config');

// connecte with mongodb by mongoose
mongoose.myFirstDatabase = mongoose.createConnection(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xnimjxb.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = mongoose;
