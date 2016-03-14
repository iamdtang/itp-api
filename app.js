'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var Genre = require('./models/Genre');
var Artist = require('./models/Artist');
var Q = require('q');
var Song = require('./models/Song');

var songController = require('./controllers/song');
var artistController = require('./controllers/artist');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/songs', songController.all);
app.get('/songs/:id', songController.one);
app.get('/artists', artistController.all);
app.get('/artists/:id', artistController.one);

app.get('/api/v1/artists', function(req, res) {
  Artist.findAll().then((artists) => {
    return res.json(artists);
  });
});

app.get('/api/v1/users', function(req, res) {
  res.json({
    data: [
      {
        id: 1,
        first: 'David',
        last: 'Tang'
      },
      {
        id: 2,
        first: 'Wayne',
        last: 'Gretzky'
      },
      {
        id: 3,
        first: 'Tony',
        last: 'Hawk'
      }
    ]
  });
});

app.get('/api/v1/artists/:id', function(req, res) {
  Artist.findWithSongs(req.params.id, (artist) => {
    res.json(artist);
  }, () => {
    res.status(404).json({
      errors: [
        { status: "404", id: "ARTIST_NOT_FOUND", detail: "Artist not found" }
      ]
    });
  });
});

app.get('/api/v2/songs', songController.all);
app.get('/api/v2/songs/:id', songController.one);
app.get('/api/v2/artists', artistController.all);
app.get('/api/v2/artists/:id', artistController.one);

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
