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
  var songs = Song.findAll();
  var artists;

  if (req.query.withArtists) {
    artists = Artist.findAll();

    Q.all([songs, artists]).then(function(data) {
      res.json({
        songs: data[0],
        artists: data[1]
      });
    });
  } else {
    songs.then(function(results) {
      res.json({
        songs: results
      });
    });
  }
});

app.get('/songs/:id', function(req, res) {
  Song.findById(req.params.id).then((song) => {
    if (song) {
      return res.json({
        song: song
      });
    }

    return res.status(404).json({
      error: 'Song not found'
    });
  });
});

app.get('/artists', function(req, res) {
  Artist.findAll().then(function(results) {
    res.json({
      artists: results
    });
  });
});

app.get('/artists/:id', function(req, res) {
  'use strict';

  console.log(req.params.id);
  var songQuery = Song.findAll({
    where: {
      artistId: req.params.id
    }
  });

  var artistQuery = Artist.findById(req.params.id);

  Q.all([ songQuery, artistQuery ]).then(function(data) {
    var artist = data[1];

    if (!artist) {
      res.status(404).json({
        error: 'Artist not found'
      });
    } else {
      let response = {
        artist: {
          id: artist.id,
          artistName: artist.artistName,
          songs: data[0].map((song) => {
            return song.id;
          })
        }
      }

      res.json(response);
    }
  });
});

app.get('/genres', function(req, res) {
  Genre.findAll().then(function(results) {
    res.json({
      genres: results
    });
  });
});

app.listen(port, function() {
	console.log('Listening on port ' + port)
});
