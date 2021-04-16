const AWS = require( "aws-sdk" );

const bucketName = "flightlogphotoes";

AWS.config.loadFromPath('./key.json');

const bucket = new AWS.S3({
  params: {
    Bucket: bucketName,
  },
});

function listObjects() {
  const listObjects = new Promise((resolve, reject) => {
    bucket.listObjects((error, data) => {
      if (error) {
        console.error("error: ", error);
        return;
      }
      
      resolve(data.Contents);
    });
  });

  return listObjects;
}

function getSingleObject(key) {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject(
      {
        Bucket: bucketName,
        Key: key,
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data.Body.toString("base64"));
      }
    );
  });

  return getSingleObject;
}

function saveObject(file) {
  const saveObject = new Promise((resolve, reject) => {
    bucket.putObject(
      {
        Key: file.name,
        Body: file,
        ACL: "public-read",
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data);
      }
    );
  });

  return saveObject;
}

module.exports = { listObjects }