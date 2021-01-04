const User = require('../modals/user');
const config = require('../config');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  loginUser: loginUser,
  registerUser: registerUser,
  fetchUser: fetchUser,
  fetchAllUser: fetchAllUser,
  updateUser: updateUser,
  updateAllUser: updateAllUser,
  removeUser: removeUser,
};

function loginUser(req, res) {
  User.findOne({
      $or: [{
          email: req.body.username,
        },
        {
          mobile: req.body.username,
        }
      ]
    })
    .then(response => {
      if (response) {
        if (req.body.password == response.password) {
          if (response.status == 'active') {
            var token = jwt.sign({
                data: response,
              },
              config.serverSecret, {
                expiresIn: config.tokenExpire,
              }
            );
            res.status(200);
            return res.json({
              success: true,
              message: 'Logged in successfully!',
              token: token,
              data: response
            });
          } else {
            res.status(400);
            return res.json({
              success: false,
              message: 'Account blocked, Please contact with support team!',
            });
          }
        } else {
          res.status(400);
          return res.json({
            success: false,
            message: 'Password does not match!',
          });
        }
      } else {
        res.status(400);
        return res.json({
          success: false,
          message: 'Account does not exists, please create account first!',
        });
      }
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to login, please try after some time!',
        error: error,
      });
    });
}

function registerUser(req, res) {
  const query = {
    $or: [{
        mobile: parseInt(req.body.mobile, 10)
      },
      {
        email: req.body.email
      },
    ]
  };
  User.find(query)
    .then(result => {
      if (result.length > 0) {
        res.status(400);
        return res.json({
          success: false,
          message: 'Account already exit, please try with another!',
        });
      } else {
        let user = new User({
          salutation: req.body.salutation,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          gender: req.body.gender,
          dob: req.body.dob,
          addressOne: req.body.addressOne,
          addressTwo: req.body.addressTwo,
          landmark: req.body.landmark,
          city: req.body.city,
          state: req.body.state,
          pinCode: req.body.pinCode,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          photo: req.body.photo,
          status: req.body.status,
        });
        user.save()
          .then(response => {
            res.status(200);
            return res.json({
              success: true,
              message: 'Account created successfully!',
              data: response,
            });
          })
          .catch(error => {
            res.status(400);
            return res.json({
              success: false,
              message: 'Unable to create account!',
              error: error,
            });
          });
      }
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to create account!',
        error: error,
      });
    });
}

function fetchUser(req, res) {
  User.find({
    _id: req['token']['_id']
  }).then(response => {
    res.status(200);
    return res.json({
      success: true,
      message: 'Data fetched successfully!',
      data: response,
    });
  }).catch(error => {
    res.status(400);
    return res.json({
      success: false,
      message: 'Unable to fetch data!',
      error: error,
    });
  });
}

function fetchAllUser(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  User.find(query)
    .sort({
      createdAt: -1
    })
    .skip(skip)
    .limit(limit)
    .then(response => {
      res.status(200);
      return res.json({
        success: true,
        message: 'Data fetched successfully!',
        data: response,
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to fetch data!',
        error: error,
      });
    });
}

function updateUser(req, res) {
  req.body.updatedAt = new Date();
  User.findByIdAndUpdate({
      _id: new ObjectId(req['token']['_id'])
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then(response => {
      res.status(200);
      return res.json({
        success: true,
        message: 'Data updated successfully!',
        data: response,
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to update data!',
        error: error,
      });
    });
}

function updateAllUser(req, res) {
  User.updateMany(req.body.query, {
      $set: req.body.data
    }, {
      multi: true
    })
    .then(response => {
      res.status(200);
      return res.json({
        success: true,
        message: 'Data updated successfully!',
        data: response,
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to update data!',
        error: error,
      });
    });
}

function removeUser(req, res) {
  User.findByIdAndRemove({
      _id: req['token']['_id'],
    })
    .then(response => {
      res.status(200);
      return res.json({
        success: true,
        message: 'Data removed successfully!',
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to remove data!',
        error: error,
      });
    });
}