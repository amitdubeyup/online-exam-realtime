const config = require("../config");
const uuid = require('uuid');
const base64Img = require('base64-img');
const fs = require('fs');

module.exports = {
  convertFileUrlToBase64Data: convertFileUrlToBase64Data,
  convertBase64DataToFile: convertBase64DataToFile,
  removeFile: removeFile,
  createS3Bucket: createS3Bucket,
  listS3Bucket: listS3Bucket,
  uploadS3Bucket: uploadS3Bucket,
  puS3Bucket: puS3Bucket,
  listS3BucketObjects: listS3BucketObjects,
  deleteS3Bucket: deleteS3Bucket
}

function convertFileUrlToBase64Data(req, res) {
  base64Img.requestBase64(req.body.filePath, (error, response, body) => {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to convert file to base64!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'File converted successfully!',
        fileData: body
      });
    }
  });
}

function convertBase64DataToFile(req, res) {
  const fileData = req.body.fileData;
  const fileDestination = 'public/uploads';
  const fileName = uuid();
  base64Img.img(fileData, fileDestination, fileName, (error, response) => {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to upload file!',
        data: error
      });
    } else {
      const localPath = response.split('/');
      res.status(200);
      res.json({
        success: true,
        message: 'File uploaded successfully!',
        filePath: `${req.protocol}://${req.headers.host}/${localPath[1]}/${localPath[2]}`
      });
    }
  });
}

function removeFile(req, res) {
  const filePath = `public/uploads/${req.body.fileName}`
  fs.exists(filePath, (exists) => {
    if (exists) {
      fs.unlink(filePath, (error) => {
        if (error) {
          res.status(400);
          res.json({
            success: false,
            message: 'Unable to delete!',
            data: error
          });
        } else {
          res.status(200);
          res.json({
            success: true,
            message: 'File deleted successfully!'
          });
        }
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to delete, File not found!'
      });
    }
  });
}

function createS3Bucket(req, res) {
  const params = {
    Bucket: req.body.bucketName,
    ACL: req.body.acl,
    CreateBucketConfiguration: {
      LocationConstraint: req.body.bucketLocation
    }
  };
  config.S3.createBucket(params, function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to create s3 bucket!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'Bucket created successfully!',
        data: response.Location
      });
    }
  });
}

function listS3Bucket(req, res) {
  config.S3.listBuckets(function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to fetch buckets!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'Buckets fetched successfully!',
        data: response.Buckets
      });
    }
  });
}

function uploadS3Bucket(req, res) {
  const base64Data = new Buffer.from((req.body.fileData).replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = (req.body.fileData).split(';')[0].split('/')[1];
  const params = {
    Bucket: req.body.bucketName,
    Key: `${uuid()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  };
  config.S3.upload(params, function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to upload file!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'File uploaded successfully!',
        data: response.Location
      });
    }
  });
}

function puS3Bucket(req, res) {
  const base64Data = new Buffer.from((req.body.fileData).replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = (req.body.fileData).split(';')[0].split('/')[1];
  const params = {
    Bucket: req.body.bucketName,
    Key: `${uuid()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  };
  config.S3.putObject(params, function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to upload file!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'File uploaded successfully!',
        data: response
      });
    }
  });
}

function listS3BucketObjects(req, res) {
  const bucketParams = {
    Bucket: req.body.bucketName,
  };
  config.S3.listObjects(bucketParams, function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to fetch bucket objects!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'Bucket objects fetched successfully!',
        data: response
      });
    }
  });
}

function deleteS3Bucket(req, res) {
  const bucketParams = {
    Bucket: req.body.bucketName,
  };
  config.S3.deleteBucket(bucketParams, function(error, response) {
    if (error) {
      res.status(400);
      res.json({
        success: false,
        message: 'Unable to delete bucket!',
        data: error
      });
    } else {
      res.status(200);
      res.json({
        success: true,
        message: 'Bucket deleted successfully!'
      });
    }
  });
}