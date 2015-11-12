'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Song = require('./Song');
var Q = require('q');

var Artist = sequelize.define('artist', {
  artistName: {
    field: 'artist_name',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

Artist.findWithSongs = function(id, success, error) {
  let songQuery = Song.findAll({
    where: {
      artistId: id
    }
  });

  let artistQuery = Artist.findById(id);

  Q.all([ songQuery, artistQuery ]).then((data) => {
    let artist = data[1];

    if (!artist) {
      return error();
    }

    return success({
      id: artist.id,
      artistName: artist.artistName,
      songs: data[0].map((song) => {
        return song.id;
      })
    }, data[0]);
  });
};

module.exports = Artist;
