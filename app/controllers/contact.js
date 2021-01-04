const Contact = require('../modals/contact');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addContact: addContact,
  fetchContact: fetchContact,
  fetchAllContact: fetchAllContact,
  updateContact: updateContact,
  updateAllContact: updateAllContact,
  removeContact: removeContact,
};

function addContact(req, res) {
  const query = {
    $or: [{
        mobile: parseInt(req.body.mobile, 10)
      },
      {
        email: req.body.email
      },
    ]
  };
  Contact.find(query)
    .then(result => {
      if (result.length > 0) {
        res.status(400);
        return res.json({
          success: false,
          message: 'Data already exit!',
        });
      } else {
        let contact = new Contact({
          salutation: req.body.salutation,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          email: req.body.email,
          mobile: req.body.mobile,
          type: req.body.type,
          status: req.body.status,
        });
        contact.save()
          .then(response => {
            res.status(200);
            return res.json({
              success: true,
              message: 'Data saved successfully!',
              data: response,
            });
          })
          .catch(error => {
            res.status(400);
            return res.json({
              success: false,
              message: 'Unable to save data!',
              error: error,
            });
          });
      }
    })
    .catch(error => {
      res.status(400);
      return res.json({
        success: false,
        message: 'Unable to save data!',
        error: error,
      });
    });
}

function fetchContact(req, res) {
  Contact.find({
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

function fetchAllContact(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  Contact.find(query)
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

function updateContact(req, res) {
  req.body.updatedAt = new Date();
  Contact.findByIdAndUpdate({
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

function updateAllContact(req, res) {
  Contact.updateMany(req.body.query, {
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

function removeContact(req, res) {
  Contact.findByIdAndRemove({
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