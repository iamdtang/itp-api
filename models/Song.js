var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

var Song = sequelize.define('song', {
  title: {
    field: 'title',
    type: Sequelize.STRING
  },

  artistId: {
    field: 'artist_id',
    type: Sequelize.INTEGER
  },

  genreId: {
    field: 'genre_id',
    type: Sequelize.INTEGER
  },

  price: {
    field: 'price',
    type: Sequelize.DECIMAL
  },

  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  }
}, {
  timestamps: false
});

module.exports = Song;
