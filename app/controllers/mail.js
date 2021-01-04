const nodemailer = require('nodemailer');

module.exports = {
  sendMail: sendMail,
  sendCustomMail: sendCustomMail,
}

function sendMail(req, res) {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.mail.us-east-1.awsapps.com',
      secure: true,
      auth: {
        user: 'info@moshikhayaka.com',
        pass: 'Mishra2020@'
      },
      debug: true
    });
    const mailOptions = {
      from: `Moshikhayaka <info@moshikhayaka.com>`,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.html
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400);
        return res.json({
          success: false,
          message: 'Unable to send email!',
          data: error
        });
      } else {
        res.status(200);
        return res.json({
          success: true,
          message: 'Mail sent successfully!',
          data: info
        });
      }
    });
  });
}

function sendCustomMail(mailData) {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.mail.us-east-1.awsapps.com',
        secure: true,
        auth: {
          user: 'info@moshikhayaka.com',
          pass: 'Mishra2020@'
        },
        debug: true
      });
      const mailOptions = {
        from: `Moshikhayaka <info@moshikhayaka.com>`,
        to: mailData.to,
        subject: mailData.subject,
        html: mailData.html
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve({
            success: false,
            message: 'Unable to send email!',
            data: error
          });
        } else {
          resolve({
            success: true,
            message: 'Mail sent successfully!',
            data: info
          });
        }
      });
    });
  });
}