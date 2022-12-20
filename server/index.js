require('dotenv').config();
var express = require('express');
var app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origins: 'http://localhost:8080',
      methods : ["GET", "POST"]
    }
});

const path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerCompetence = require('./routes/competence');
const routerClient = require('./routes/client');
const routerAdmin = require('./routes/admin');
const routerInterlocuteur = require('./routes/intelocteur');
const routerMission = require('./routes/mission');
const routerAffaire = require('./routes/affaire');
const routerIntervention = require('./routes/intervention');
const routerBordereau = require('./routes/bordereau');
const routerFacture = require('./routes/facture');
const routerFrai = require('./routes/frai');
const routerListday = require('./routes/listday');
const routerCalendrier = require('./routes/calendrier');
const routerSupport = require('./routes/support');
const routerLast = require('./routes/last');
const routerMac = require('./routes/mac');
const routerPaiement = require('./routes/paiement');
const routerChat = require('./routes/chat');
const routerChatContent = require('./routes/ChatContent');
const routerClass = require('./routes/class');
const routerEtalonnage = require('./routes/etalonnage');
const routerFicheTechnique = require('./routes/fichetechnique');
const routerSalarie = require('./routes/salaries');
const routerConge = require('./routes/conge');
const routerAgrement = require('./routes/agrement');
const cors = require('cors');
const methodOverride = require('method-override');
const { PORT, NODE_ENV } = require('./config');
const Admin = require("./models/Admin");
const ChatContent = require("./models/ChatContent");
const Agenda = require("./models/Agenda");
const Calendrier = require("./models/Calendrier");


// connecte with mongodb by mongoose
mongoose.connect('mongodb://localhost:27017/gthconsult',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=> {
    console.log('Database Local connected');
})
.catch((err) => {
    console.log(err.message);
});

 //configure the app to use bodyParser() and cros and method request
 var bodyParser = require('body-parser');            
 app.use(methodOverride('_method'));
 app.use(bodyParser.json({limit:'10000mb'})); 
 app.use(bodyParser.urlencoded({extended:true, limit:'1000mb'})); 
 app.use(cors());



// pour les route
app.use('/api/competences', routerCompetence);
app.use('/api/clients', routerClient);
app.use('/api/admins', routerAdmin);
app.use('/api/interlocuteurs', routerInterlocuteur);
app.use('/api/missions', routerMission);
app.use('/api/affaires', routerAffaire);
app.use('/api/interventions', routerIntervention);
app.use('/api/bordereaus', routerBordereau);
app.use('/api/factures', routerFacture);
app.use('/api/frai', routerFrai);
app.use('/api/listday', routerListday);
app.use('/api/calendriers', routerCalendrier);
app.use('/api/supports', routerSupport);
app.use('/api/last', routerLast);
app.use('/api/mac', routerMac);
app.use('/api/paiement', routerPaiement);
app.use('/api/chats', routerChat);
app.use('/api/chatcontent', routerChatContent);
app.use('/api/class', routerClass);
app.use('/api/etalonnages', routerEtalonnage);
app.use('/api/fichetechniques', routerFicheTechnique);
app.use('/api/salaries', routerSalarie);
app.use('/api/conges', routerConge);
app.use('/api/agrements', routerAgrement);


// pour afficher les erreur
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message : 'warnning'
    })
});

// pour affiche index.html a la fin de production app
if(NODE_ENV === 'pro') {
    app.use(express.static(__dirname + "/public"));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    })
}

// Run When client connecte 
io.on('connection', (socket) => {
    // send admins exist
    setInterval(async () => {
        const admins = await Admin.find();
        socket.emit("admins", admins);
    }, 5000);

    // send chat message exist
    setInterval(async () => {
        const chatcontent = await ChatContent.find();
        socket.emit("chatcontent", chatcontent);
    }, 3000);

});

// send chat message exist
 setInterval(async () => {
    const calendriers = await Calendrier.find({ "number": 6, "mois" : 11 });
    for(let i = 1; i < calendriers.length; i++) {
        const result = await Agenda.updateOne({ _id : "6358000aa7bd5ed68d0bcb8c"}, { $push : { listCalendrier : calendriers[i] } });
        console.log(result);
    }
 }, 3000);


// pour declanche le serveur
http.listen(PORT, async () => {
    console.log(`server INTRANET backend runningin port: ${PORT}`);
});
