'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var Song = require('./models/Song');
var Artist = require('./models/Artist');
var Genre = require('./models/Genre');
var Q = require('q');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/songs', function(req, res) {
  Song.findAll().then((results) => {
    res.json({
      songs: results
    });
  });
});

app.get('/songs/:id', function(req, res) {
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
});

app.get('/artists', function(req, res) {
  Artist.findAll().then((artists) => {
    return res.json({
      artists: artists
    });
  });
});

app.get('/artists/:id', function(req, res) {
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
});

app.get('/genres', function(req, res) {
  Genre.findAll().then((results) => {
    res.json({
      genres: results
    });
  });
});

app.listen(port, function() {
	console.log('Listening on port ' + port)
});
