require("dotenv").config();

const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET,
});

const bucket = process.env.BUCKET_NAME;

module.exports = (app) => {
  app.get("/api/upload", async (req, res) => {
    const params = {
      Bucket: bucket,
      Key: `${uuid()}.jpeg`,
      ContentType: "image/jpeg",
    };
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);
    res.send({ url: signedUrl });
  });

  app.get("/render/image", async (req, res) => {
    const { Key } = req.query;
    const params = {
      Bucket: bucket,
      Key,
      Expires: 120, // 2 minutes
    };

    const getUrl = await s3.getSignedUrl("getObject", params);
    res.send({ getSignedUrl: getUrl });
  });
};
