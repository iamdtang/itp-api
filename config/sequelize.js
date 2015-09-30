var Sequelize = require('sequelize');

var sequelize = new Sequelize('music', 'student', 'ttrojan', {
  dialect: 'mysql',
  host: 'itp460.usc.edu'
});

module.exports = sequelize;
