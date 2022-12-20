const Agrement = require("../models/Agrement");
const AWS = require("aws-sdk");

const {
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_NAME,
} = require("../config");

const spacesEndpoint = new AWS.Endpoint(DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
});


// Read agrements
exports.read = async (req, res, next) => {
    const agrements = await Agrement.find();
    res.status(200).json({ agrements });
};

// select agrement
exports.select = async (req, res, next) => {
    const { agrementId } = req.body;
    const agrement = await Agrement.findById(agrementId);
    res.status(200).json({ agrement });
};

// display agrement in browser
exports.displayAgrement =  async (req, res) => {
  
    const filename = req.params.filename;
    let x = await s3
      .getObject({
        Bucket: DO_SPACES_NAME,
        Key: filename,
      })
      .promise();
    res.writeHead(200, {
      "Content-Type": "application/pdf",
    });
    res.write(x.Body, "binary");
    res.send();
  
}