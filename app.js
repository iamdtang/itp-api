'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var Genre = require('./models/Genre');

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
