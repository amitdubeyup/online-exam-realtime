const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1"
});
const S3 = new AWS.S3({
  accessKeyId: 'AKIATWF3VOVMERWWLQT4',
  secretAccessKey: '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',
});

module.exports = {
  S3: S3,
  // database: 'mongodb://moshikhyaka:moshikhyaka@13.233.37.240:27017/moshikhyaka',
  database: 'mongodb+srv://my-exam:my-exam@my-exam.3gbln.mongodb.net/my-exam?retryWrites=true&w=majority',
  serverSecret: '$2y$12$4A2phQdjCl9fFvcuTHpn3.l7mZTBNagz4HrApfnY1tJYcyHgalifK',
  tokenExpire: '30d',
  google_api_key: 'AIzaSyCJnen-AB1eM6aoGKKLSnA1cyDIQknzD5Q',
};