var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

module.exports = sequelize.define('song', {
  title: {
    field: 'title',
    type: Sequelize.STRING
  },
  artist: {
    field: 'artist_id',
    type: Sequelize.INTEGER
  },
  genre: {
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
  },
  createdBy: {
    type: Sequelize.STRING,
    field: 'created_by'
  }
}, {
  timestamps: false
});
