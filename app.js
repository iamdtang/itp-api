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

app.get('/artists', function(req, res) {
  Artist.findAll().then(function(results) {
    res.json({
      artists: results
    });
  });
});

app.get('/artists/:id', function(req, res) {
  console.log(req.params.id);
  Artist.findById(req.params.id).then(function(artist) {
    if (!artist) {
      res.json({
        error: 'Artist not found'
      }, 404);
    } else {
      res.json({
        artist: artist
      });
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
