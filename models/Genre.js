var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

var Genre = sequelize.define('genre', {
  genreTitle: {
    field: 'genre',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Genre;
