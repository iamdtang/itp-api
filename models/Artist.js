var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

var Artist = sequelize.define('artist', {
  artistName: {
    field: 'artist_name',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Artist;
