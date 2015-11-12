'use strict';

var Artist = require('./../models/Artist');
var Q = require('q');

module.exports = {
  all: function(req, res) {
    Artist.findAll().then((artists) => {
      return res.json({
        artists: artists
      });
    });
  },

  one: function(req, res) {
    Artist.findWithSongs(req.params.id, function(artist, songs) {
      res.json({
        artist: artist,
        songs: songs
      });
    }, function() {
      res.status(404).json({
        errors: [
          { status: "404", id: "ARTIST_NOT_FOUND", detail: "Artist not found" }
        ]
      });
    });
  }
};
