const Frais = require("../models/Frais");
const Admin = require("../models/Admin");
const Listday = require("../models/Listday");
const XLSX = require("xlsx");
const path = require('path');
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
var Excel = require('exceljs');


exports.Valider = async (req, res, next) => {

    const {
        nom,
        prenom,
        matricule,
        mois,
        annee,
        listDays,
        totalGeneral,
        valideListDays,
    } = req.body;


    await Frais({
        nom: nom,
        prenom: prenom,
        matricule: matricule,
        mois: mois,
        annee: annee,
        listDays: listDays,
        totalGeneral: totalGeneral,
        valideListDays: valideListDays,
        valideRH: false,
        valideDIR: false
    })
    .save()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ data: err });
    });


}    


exports.CheckMoisValider = async (req, res, next) => {

    const { matricule } = req.body;


    await Frais.find({ matricule : matricule })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ data: err });
    });


}    


exports.Read = async (req, res, next) => {

    await Frais.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(200).json({ err });
    });


}    


exports.GenerateXSLX = async (req, res, next) => {

     const { fraiId } = await req.params;
     var filename = path.resolve(__dirname, "../frais/fraisMoisInspecteur.xlsx");
     var output = path.resolve(__dirname, `../frais/${fraiId}.xlsx`);

      if(fs.existsSync(output)) {  
            fs.unlink(output, function (err) {
              if (err) throw err;
              console.log('File deleted!');
            });
      } 

      try {

        let workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename);
        var worksheet = workbook.getWorksheet("mois");

        const data = await Frais.findById(fraiId);

        // nom 
        let nom = worksheet.getRow(3);
        nom.getCell(3).value = data.nom;
        nom.commit();

        // prenom 
        let prenom = worksheet.getRow(3);
        prenom.getCell(5).value = data.prenom;
        prenom.commit();

        // matricule 
        let matricule = worksheet.getRow(3);
        matricule.getCell(7).value = data.matricule;
        matricule.commit();

        // annee 
        let annee = worksheet.getRow(3);
        annee.getCell(11).value = data.annee;
        annee.commit();

        // mois 
        let mois = worksheet.getRow(3);
        mois.getCell(10).value = data.mois;
        mois.commit();

        // date 
        let dt = worksheet.getRow(38);
        const date = new Date();
        dt.getCell(2).value = date.toLocaleDateString("fr-FR");
        dt.commit();

        var totalGasoil = 0
        var totalAutoroute = 0
        var totalTaxi = 0
        var totalTrain = 0
        var totalHotel = 0
        var totalRepas = 0
        var totalAutre = 0

        for(let i = 0; i <= data.listDays.length; i++) {

          try{

            let jourData = worksheet.getRow(`${6 + i}`);
            jourData.getCell(1).value = data.listDays[i].jour;
            jourData.commit();

            let numberData = worksheet.getRow(`${6 + i}`);
            numberData.getCell(2).value = data.listDays[i].number + 1;
            numberData.commit();

            let clientData = worksheet.getRow(`${6 + i}`);
            clientData.getCell(3).value = data.listDays[i].client;
            clientData.commit();

            let lieuData = worksheet.getRow(`${6 + i}`);
            lieuData.getCell(4).value = data.listDays[i].lieu;
            lieuData.commit();

            let objetData = worksheet.getRow(`${6 + i}`);
            objetData.getCell(5).value = data.listDays[i].objet;
            objetData.commit();


            let gasoilData = worksheet.getRow(`${6 + i}`);

            if(data.listDays[i].gasoil == 0) {
              gasoilData.getCell(6).value = "-";
              gasoilData.commit();
            } else {
              gasoilData.getCell(6).value = data.listDays[i].gasoil;
              gasoilData.commit();
            }


            let autorouteData = worksheet.getRow(`${6 + i}`);
            if(data.listDays[i].autoroute == 0){
              autorouteData.getCell(7).value = "-";
              autorouteData.commit();
            } else {
              autorouteData.getCell(7).value = data.listDays[i].autoroute;
              autorouteData.commit();
            }


            let taxiData = worksheet.getRow(`${6 + i}`);

            if( data.listDays[i].taxi == 0){
              taxiData.getCell(8).value = "-";
              taxiData.commit();
            } else {
              taxiData.getCell(8).value = data.listDays[i].taxi;
              taxiData.commit();
            }

            let trainData = worksheet.getRow(`${6 + i}`);

            if(data.listDays[i].train == 0){
              trainData.getCell(9).value = "-";
              trainData.commit();
            } else {
              trainData.getCell(9).value = data.listDays[i].train;
              trainData.commit();
            }


            let hotelData = worksheet.getRow(`${6 + i}`);

            if(data.listDays[i].hotel == 0){
              hotelData.getCell(10).value = "-";
              hotelData.commit();
            } else {
              hotelData.getCell(10).value = data.listDays[i].hotel;
              hotelData.commit();
            }


            let repasData = worksheet.getRow(`${6 + i}`);

            if(data.listDays[i].repas == 0){
              repasData.getCell(11).value = "-";
              repasData.commit();
            } else {
              repasData.getCell(11).value = data.listDays[i].repas;
              repasData.commit();
            }


            let autreData = worksheet.getRow(`${6 + i}`);

            if(data.listDays[i].autre == 0){
              autreData.getCell(12).value = "-";
              autreData.commit();
            } else {
              autreData.getCell(12).value = data.listDays[i].autre;
              autreData.commit();
            }


            let totalData = worksheet.getRow(`${6 + i}`);
            totalData.getCell(13).value = parseFloat(data.listDays[i].gasoil) + parseFloat(data.listDays[i].autoroute) + parseFloat(data.listDays[i].taxi) + parseFloat(data.listDays[i].train) + parseFloat(data.listDays[i].hotel) + parseFloat(data.listDays[i].repas) + parseFloat(data.listDays[i].autre);
            totalData.commit();

            totalGasoil = totalGasoil + parseFloat(data.listDays[i].gasoil);
            totalAutoroute = totalAutoroute + parseFloat(data.listDays[i].autoroute);
            totalTaxi = totalTaxi + parseFloat(data.listDays[i].taxi);
            totalTrain = totalTrain + parseFloat(data.listDays[i].train);
            totalHotel = totalHotel + parseFloat(data.listDays[i].hotel);
            totalRepas = totalRepas + parseFloat(data.listDays[i].repas);
            totalAutre = totalAutre + parseFloat(data.listDays[i].autre);

            let gasoilTot = worksheet.getRow(37);
            gasoilTot.getCell(6).value = totalGasoil;
            gasoilTot.commit();

            let autorouteTot = worksheet.getRow(37);
            autorouteTot.getCell(7).value = totalAutoroute;
            autorouteTot.commit();

            let taxiTot = worksheet.getRow(37);
            taxiTot.getCell(8).value = totalAutoroute;
            taxiTot.commit();

            let trainTot = worksheet.getRow(37);
            trainTot.getCell(9).value = totalTrain;
            trainTot.commit();

            let hotelTot = worksheet.getRow(37);
            hotelTot.getCell(10).value = totalHotel;
            hotelTot.commit();

            let repasTot = worksheet.getRow(37);
            repasTot.getCell(11).value = totalRepas;
            repasTot.commit();

            let autreTot = worksheet.getRow(37);
            autreTot.getCell(12).value = totalAutre;
            autreTot.commit();

            let Total = worksheet.getRow(37);
            Total.getCell(13).value = parseFloat(totalGasoil + totalAutoroute + totalTaxi + totalTrain + totalHotel + totalRepas + totalAutre);
            Total.commit();


          } catch(error) {
            console.log(error.message)
          }
        }
      
        workbook.xlsx.writeFile(output)
        .then(async () => {
          res.download(output);
        })
        .catch((error) => {
          console.log(error.message);
        })

        // 

        
      } catch(error) {
        console.log(error.message);
      }


      

}    


exports.GenerateWORD = async (req, res, next) => {

    const { fraiId, nom, prenom } = await req.params;
    var filePath = `./frais/${fraiId}.docx`;
 

    if(fs.existsSync(filePath)) {
        
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });

    } 

    // template file
     const fileTemplate = `./frais/fraisMoisInspecteur.docx`;

     // create Array
     const fraisList = new Array();

      // Get data
     const data = await Frais.findById(fraiId);

     // loop for set data in array listDays
     data.listDays.forEach(element => {
      fraisList.push(element);
     });
    

    //  // Set Data in Array 
    //  // array
     var items = new Array();
     // Somme 
      var gt = 0;
      var at = 0; 
      var tt = 0;   
      var trt = 0; 
      var ht = 0; 
      var rt = 0; 
      var aut = 0; 
      var tot = 0;
      // lop for insert data
     fraisList.forEach((element, index) => {
      
        gt = gt + parseFloat(element.gasoil);
        at = at + parseFloat(element.autoroute);
        tt = tt + parseFloat(element.taxi);
        trt = trt + parseFloat(element.train);
        ht = ht + parseFloat(element.hotel);
        rt = rt + parseFloat(element.repas);
        aut = aut + parseFloat(element.autre);
      
      
       items.push({ 
          num : index + 1,
          j : element.jour == null ? " " : element.jour.substr(0, 1),
          l : element.lieu == null ? " " : element.lieu,
          c : element.client == null ? " " : element.client,
          o : element.objet == null ? " " : element.objet,
          g : element.gasoil == 0 ? " " : element.gasoil,
          a : element.autoroute == 0 ? " " : element.autoroute,
          t : element.taxi == 0 ? " " : element.taxi,
          tr : element.train == 0 ? " " : element.train,
          h : element.hotel == 0 ? " " : element.hotel,
          r : element.repas == 0 ? " " : element.repas,
          au : element.autre == 0 ? " " : element.autre,
          to : parseFloat(parseFloat(element.gasoil) + parseFloat(element.autoroute) + parseFloat(element.taxi) + parseFloat(element.train) + parseFloat(element.hotel) + parseFloat(element.repas) + parseFloat(element.autre)) 
       })
     });

     tot = parseFloat(parseFloat(gt)+ parseFloat(at) + parseFloat(tt) + parseFloat(trt) + parseFloat(ht) + parseFloat(rt) + parseFloat(aut));
     



    //  // Load the docx file as binary content
     const content = fs.readFileSync(fileTemplate,"binary");
     
     const zip = new PizZip(content);
     
     const doc = new Docxtemplater(zip, {
             paragraphLoop: true,
             linebreaks: true,
     });
 
     doc.render({
         items : items,
         nom : nom,
         prenom : prenom,
         date : new Date().toLocaleDateString(),
         mois : data.mois,
         annee : data.annee,
         gt : gt,
         at : at, 
         tt : tt,   
         trt : trt, 
         ht : ht, 
         rt : rt, 
         aut : aut,
         tot : tot
     });
 
     const buf = doc.getZip().generate({
         type: "nodebuffer",
         compression: "DEFLATE",
     });
     

     const flagSuccesWrite = await fs.writeFileSync(filePath, buf);


     if(flagSuccesWrite == undefined) {

         res.download(filePath, (err) => {
             if (err) {
               throw err;
             }
         });

     }
     
     
}    




exports.validRH = async (req, res, next) => {

    const { fraiId } = await req.body;
    await Frais.findByIdAndUpdate(fraiId, { $set: { valideRH : true, etatPaiment : false, validerDatePaiment :false } })
    .then((response) => {
      res.json({response}).status(200);
    })
    .catch((err) => {
      res.json({msg : err.message}).status(200);
    });

}
  
  
exports.validDIR = async (req, res, next) => {
  
    const { fraiId } = await req.body;
    await Frais.findByIdAndUpdate(fraiId, { $set: { valideDIR : true  } })
    .then((response) => {
      res.json({response}).status(200);
    })
    .catch((err) => {
      res.json({msg : err.message}).status(200);
    })
  
  
}


exports.Paiment = async (req, res, next) => {


    const { fraiId , refTransaction, typePaiment } = await req.body;

    if(refTransaction.length === 0 || typePaiment.length === 0) {

        await Frais.findByIdAndUpdate(fraiId, { $set: { typePaiment : typePaiment , refTransaction : refTransaction , etatPaiment : false, validerDatePaiment : false } })
        .then((response) => {
          res.json({response}).status(200);
        })
        .catch((err) => {
          res.json({msg : err.message}).status(200);
        });

    } 

    if(refTransaction.length > 0 && typePaiment.length > 0) {

        await Frais.findByIdAndUpdate(fraiId, { $set: { typePaiment : typePaiment , refTransaction : refTransaction , etatPaiment : true, validerDatePaiment : false } })
        .then((response) => {
          res.json({response}).status(200);
        })
        .catch((err) => {
          res.json({msg : err.message}).status(200);
        });

    }
 
}




exports.SupprimerPaiment = async (req, res, next) => {


    const { fraiId } = await req.body;

        await Frais.findByIdAndUpdate(fraiId, { $set: { typePaiment : null , refTransaction : null , etatPaiment : false, validerDatePaiment : false } })
        .then((response) => {
          res.json({response}).status(200);
        })
        .catch((err) => {
          res.json({msg : err.message}).status(200);
        });

}


exports.SupprimerFrais = async (req, res, next) => {

  const { fraiId, mois, annee, matricule} = await req.body;

      await Frais.findByIdAndRemove(fraiId)
      .then(async () => {
        await Listday.deleteMany( {'mois': mois,'annee': annee, 'matricule': matricule} )
        .then((response) => {
          res.json({ response }).status(200);
        })
        .catch((error) => {
          res.json({msg : error.message}).status(200);
        })
      })
      .catch((err) => {
        res.json({msg : err.message}).status(200);
      });

}


exports.PaimentDate = async (req, res, next) => {


    const { fraiId , datePaiment } = await req.body;
 
    await Frais.findByIdAndUpdate(fraiId, { $set: { datePaiment : datePaiment, validerDatePaiment : true } })
    .then((response) => {
      res.json({response}).status(200);
    })
    .catch((err) => {
      res.json({msg : err.message}).status(200);
    });
  
}
