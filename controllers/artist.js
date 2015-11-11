'use strict';

var Artist = require('./../models/Artist');
var Q = require('q');
var Song = require('./../models/Song');

module.exports = {
  all: function(req, res) {
    Artist.findAll().then((artists) => {
      return res.json({
        artists: artists
      });
    });
  },

  one: function(req, res) {
    let songQuery = Song.findAll({
      where: {
        artistId: req.params.id
      }
    });

    let artistQuery = Artist.findById(req.params.id);

    Q.all([ songQuery, artistQuery ]).then((data) => {
      let artist = data[1];

      if (!artist) {
        return res.status(404).json({
          errors: [
            { status: "404", id: "ARTIST_NOT_FOUND", detail: "Artist not found" }
          ]
        });
      }

      return res.json({
        artist: {
          id: artist.id,
          artistName: artist.artistName,
          songs: data[0].map((song) => {
            return song.id;
          })
        }
      });
    });
  }
};
