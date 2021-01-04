const https = require("https");
const msg91 = require("msg91")("331127AWuv6b9MBM5f06af85P1", "NSGTRA", 4);
const axios = require('axios');

module.exports = {
  sendSMS: sendSMS,
  sendCustomSMS: sendCustomSMS,
  getBalance: getBalance
};

function sendSMS(req, res) {
  const url = `http://api.msg91.com/api/sendhttp.php?sender=NSGTRA&route=4&mobiles=91${req.body.mobile}&authkey=331127AWuv6b9MBM5f06af85P1&country=91&message=${req.body.message}&response=json`;
  msg91.send(req.body.mobile, url, function(error, response) {
    if (error) {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to send SMS!',
      });
    } else {
      res.status(200);
      return res.json({
        success: true,
        message: 'SMS send successfully!',
      });
    }
  });
}

function sendCustomSMS(smsData) {
  return new Promise((resolve, reject) => {
    const url = `http://api.msg91.com/api/sendhttp.php?sender=NSGTRA&route=4&mobiles=91${smsData.mobile}&authkey=331127AWuv6b9MBM5f06af85P1&country=91&message=${smsData.message}&response=json`;
    msg91.send(smsData.mobile, url, function(error, response) {
      if (error) {
        resolve({
          success: false,
          message: 'Unable to send SMS!',
        });
      } else {
        resolve({
          success: true,
          message: 'SMS send successfully!',
        });
      }
    });
  });
}

function getBalance(req, res) {
  msg91.getBalance(function(error, response) {
    if (error) {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to fetch sms count!',
      });
    } else {
      res.status(200);
      return res.json({
        success: true,
        message: 'SMS count fetched successfully!',
        data: response
      });
    }
  });
}