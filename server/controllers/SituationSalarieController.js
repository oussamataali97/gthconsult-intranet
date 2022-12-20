const Frais = require("../models/Frais");
const SituationSalarie = require("../models/SituationSalarie")
const XLSX = require("xlsx");
const path = require('path');
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
var Excel = require('exceljs');


// Read Salarie
exports.read = async (req, res, next) => {
    const { inspecteur, annee } = req.body;
    const frais = await Frais.find({ matricule : inspecteur, annee : annee , valideRH :true, valideDIR : true });
    const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });
    res.json({ frais, situation }).status(200);
};

// Telecharger Frais Salarie
exports.telecharger = async (req, res, next) => {

    const { inspecteur, annee } = req.params;
    const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });

    var filename = path.resolve(__dirname, "../frais/fraisMoisInspecteur.xlsx");
    var output = path.resolve(__dirname, `../frais/${situation._id}-annee.xlsx`);

     if(fs.existsSync(output)) {  
           fs.unlink(output, function (err) {
             if (err) throw err;
             console.log('File deleted!');
           });
     } 

     try {

        let workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename);
        var worksheet = workbook.getWorksheet("annee");


        // Start avance

        var totalValueAvance = 0;

        for(let i = 0; i < situation.liste.length; i++) {

            var valueAvance = parseFloat(situation.liste[i].avance);
            totalValueAvance = totalValueAvance + valueAvance;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(2);

                    let avance = worksheet.getRow(row);
                    avance.getCell(cell).value = valueAvance;
                    avance.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }

       let totalAvance = worksheet.getRow(15);
       totalAvance.getCell(2).value = totalValueAvance;
       totalAvance.commit();

       // End Avance


        // Start Frais Depose
        var totalValueFraisDepose = 0;

        for(let i = 0; i < situation.liste.length; i++) {

            var FraisDepose = parseFloat(situation.liste[i].fraisDepose);
            totalValueFraisDepose = totalValueFraisDepose + FraisDepose;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(3);

                    let fraisDepose = worksheet.getRow(row);
                    fraisDepose.getCell(cell).value = FraisDepose;
                    fraisDepose.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }

       let totalFraisDepose = worksheet.getRow(15);
       totalFraisDepose.getCell(3).value = totalValueFraisDepose;
       totalFraisDepose.commit();
       // End Frais Depose


        // Start frais Payer
        var totalValueFraisPayer = 0;

        for(let i = 0; i < situation.liste.length; i++) {

            var fraisPayer = parseFloat(situation.liste[i].fraisPayer);
            totalValueFraisPayer = totalValueFraisPayer + fraisPayer;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(4);

                    let fraisPayer = worksheet.getRow(row);
                    fraisPayer.getCell(cell).value = situation.liste[i].fraisPayer;
                    fraisPayer.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }

       let totalFraisPayer = worksheet.getRow(15);
       totalFraisPayer.getCell(4).value = totalValueFraisPayer;
       totalFraisPayer.commit();
       // End Frais Depose


        // Start Mode
        for(let i = 0; i < situation.liste.length; i++) {

            var mode = situation.liste[i].mode;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(5);

                    let modeValue = worksheet.getRow(row);
                    modeValue.getCell(cell).value = mode;
                    modeValue.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }
       // End Mode

        // Start Date Payer
        for(let i = 0; i < situation.liste.length; i++) {

            var datePayer = situation.liste[i].datePayer;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(6);

                    let datePayerValue = worksheet.getRow(row);
                    datePayerValue.getCell(cell).value = datePayer;
                    datePayerValue.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }
       // End Date Payer


      // Start Reste Avance
        var totalValueResteAvance = 0;

        for(let i = 0; i < situation.liste.length; i++) {

            var resteAvance = parseFloat(situation.liste[i].resteAvance);
            totalValueResteAvance = totalValueResteAvance + resteAvance;

                try{

                    const row = parseInt(i + 3);
                    const cell = parseInt(7);

                    let resteAvanceValue = worksheet.getRow(row);
                    resteAvanceValue.getCell(cell).value = resteAvance;
                    resteAvanceValue.commit();

                  } catch(error) {
                    console.log(error.message);
                  }
       }

       let totalResteAvance = worksheet.getRow(15);
       totalResteAvance.getCell(7).value = totalValueResteAvance;
       totalResteAvance.commit();
       // End Reste Avance

       // Start Reste Payer
        var totalValueRestePayer = 0;

        for(let i = 0; i < situation.liste.length; i++) {
       
            var restePayer = parseFloat(situation.liste[i].restePayer);
            totalValueRestePayer = totalValueRestePayer + restePayer;
       
                 try{
       
                    const row = parseInt(i + 3);
                    const cell = parseInt(8);
    
                    let restePayerValue = worksheet.getRow(row);
                    restePayerValue.getCell(cell).value = restePayer;
                    restePayerValue.commit();
       
                 } catch(error) {
                    console.log(error.message);
                }
        }
       
              let totalRestePayer = worksheet.getRow(15);
              totalRestePayer.getCell(8).value = totalValueRestePayer;
              totalRestePayer.commit();
              // End Reste Payer
     
       workbook.xlsx.writeFile(output)
       .then(async () => {
         res.download(output);
       })
       .catch((error) => {
         console.log(error.message);
       });

     } catch(error) {
       console.log(error.message);
     }
};


exports.create = async (req, res, next) => {

    const { id, i, annee, inspecteur , current, after } = req.body;

    const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });

    if(situation == null) {
        // set value vide for start saved
        var listSituation = [];
        for(let j = 0; j < 12; j++) {
            listSituation[j] =  {
                index: j,
                annee: annee,
                mois: "",
                avance: 0,
                restePayer: 0,
                fraisDepose: 0,
                fraisPayer: 0,
                resteAvance: 0,
                totalPayer: 0,
                mode: "",
                reference: "",
                datePayer: "",
                disabled: false
              }
        }

        // set in value specfique
        listSituation[i].index = i;
        listSituation[i].annee = annee;
        listSituation[i].mois = current.mois;
        listSituation[i].avance = current.avance;
        listSituation[i].restePayer = current.restePayer;
        listSituation[i].fraisDepose = current.fraisDepose;
        listSituation[i].fraisPayer = current.fraisPayer;
        listSituation[i].resteAvance = current.resteAvance;
        listSituation[i].totalPayer = current.totalPayer;
        listSituation[i].mode = current.mode;
        listSituation[i].reference = current.reference;
        listSituation[i].datePayer = current.datePayer;
        listSituation[i].disabled = true;

        listSituation[i + 1].index = i + 1;
        listSituation[i + 1].annee = annee;
        listSituation[i + 1].mois = after.mois;
        listSituation[i + 1].avance = after.avance;

        await SituationSalarie({
            matricule : inspecteur,
            annee : annee,
            liste : listSituation
        }).save()
        .then(async(result) => { 
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });

    } else {

        const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });

        situation.liste[i].index = i;
        situation.liste[i].annee = annee;
        situation.liste[i].mois = current.mois;
        situation.liste[i].avance = current.avance;
        situation.liste[i].restePayer = current.restePayer;
        situation.liste[i].fraisDepose = current.fraisDepose;
        situation.liste[i].fraisPayer = current.fraisPayer;
        situation.liste[i].resteAvance = current.resteAvance;
        situation.liste[i].totalPayer = current.totalPayer;
        situation.liste[i].mode = current.mode;
        situation.liste[i].reference = current.reference;
        situation.liste[i].datePayer = current.datePayer;
        situation.liste[i].disabled = true;

        situation.liste[i + 1].index = i + 1;
        situation.liste[i + 1].annee = annee;
        situation.liste[i + 1].mois = after.mois;
        situation.liste[i + 1].avance = after.avance;


        await SituationSalarie.updateOne(
            { matricule: inspecteur, annee : annee },
            { 
                $set: { 
                    liste: situation.liste
                 } 
            } 
        ).then((result) => {
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });

    }

};


exports.delete = async (req, res, next) => {

    const { id, i, annee, inspecteur , current, after } = req.body;

    const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });

    if(situation != null) {

        const situation = await SituationSalarie.findOne({ matricule: inspecteur, annee : annee });

        for(let j = i; j < 12; j++) {

            situation.liste[j].index = j;
            situation.liste[j].annee = annee;
            situation.liste[j].mois = "";
            situation.liste[j].avance = 0;
            situation.liste[j].restePayer = 0;
            situation.liste[j].fraisPayer = 0;
            situation.liste[j].resteAvance = 0;
            situation.liste[j].totalPayer = 0;
            situation.liste[j].reference = "";
            situation.liste[j].disabled = false;
        }

        await SituationSalarie.updateOne(
            { matricule: inspecteur, annee : annee },
            { 
                $set: { 
                    liste: situation.liste
                 } 
            } 
        ).then((result) => {
            res.status(200).json({ msg : "succes", result : result });
        })
        .catch((error) => {
            res.status(200).json({ msg : "echec", result : error.message });
        });

    }

};
