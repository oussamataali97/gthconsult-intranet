const path = require("path");
const fs = require("fs");

exports.Display = async (req, res, next) => {

  const filename = req.params.filename;


  for(let i = 0; i < 9; i++) {

    const dirPath = path.join(__dirname, `../supports/elec/${i}/${filename}.pdf`);
    const dirPathSecond = path.join(__dirname, `../supports/elec/3/NormesélectricitéBT-HT--Français/${filename}.pdf`);
    const dirPathThrid = path.join(__dirname, `../supports/elec/5/Normes NM IMANOR/${filename}.pdf`);

    if(fs.existsSync(dirPath)) {

        fs.readFile(dirPath , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });

        break;
    }


    if(fs.existsSync(dirPathSecond)) {

        fs.readFile(dirPathSecond , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });

        break;
    }

    if(fs.existsSync(dirPathThrid)) {

        fs.readFile(dirPathThrid , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });

        break;
    }

  }

};