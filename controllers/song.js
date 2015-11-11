'use strict';

var Song = require('./../models/Song');

module.exports = {
  all: function(req, res) {
    Song.findAll().then((results) => {
      res.json({
        songs: results
      });
    });
  },

  one: function(req, res) {
    Song.findById(req.params.id).then((song) => {
      if (song) {
        return res.json({
          song: song
        });
      }

      return res.status(404).json({
        errors: [
          { status: "404", id: "SONG_NOT_FOUND", detail: "Song not found" }
        ]
      });
    });
  }
};
