require('dotenv').config();

module.exports = {
  // database: 'mongodb://moshikhayaka:moshikhayaka@localhost:27017/moshikhayaka',
  database: process.env.DATABASE,
};