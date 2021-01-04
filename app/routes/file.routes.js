const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');

router.post('/convert-file-to-base64', fileController.convertFileUrlToBase64Data);
router.post('/convert-base64-to-file', fileController.convertBase64DataToFile);
router.post('/remove-file', fileController.removeFile);
router.post('/create-s3-bucket', fileController.createS3Bucket);
router.get('/list-s3-bucket', fileController.listS3Bucket);
router.post('/upload-s3-bucket', fileController.uploadS3Bucket);
router.post('/put-s3-bucket', fileController.puS3Bucket);
router.post('/list-s3-bucket-objects', fileController.listS3BucketObjects);
router.post('/delete-s3-bucket', fileController.deleteS3Bucket);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;