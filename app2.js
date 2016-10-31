const app = require('koa')();
const router = require('koa-router')();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const Validator = require('validatorjs');
const faker = require('faker');

const sequelize = require('./config/sequelize');
const Genre = require('./models/Genre');
const Artist = require('./models/Artist');
const Song = require('./models/Song');
const ForbiddenResponse = require('./responses/forbidden');
const NotFoundResponse = require('./responses/not-found');
const BadRequest = require('./responses/bad-request');

app.use(cors());
app.use(bodyParser());

router.get('/api/v1/me', function *() {
  this.body = {
    data: {
      firstName: 'Yehuda',
      lastName: 'Katz',
      openSourceProjects: [
        { name: 'Ember.js' },
        { name: 'Rust' },
        { name: 'jQuery' },
        { name: 'Ruby on Rails' },
        { name: 'Yarn' }
      ],
      isAdmin: faker.random.boolean()
    }
  };
});

router.get('/api/songs', function *(next) {
  this.body = yield Song.findAll();
});

router.get('/api/genres', function *(next) {
  this.body = yield Genre.findAll();
});

router.get('/api/artists', function *(next) {
  let artists = yield Artist.findAll();
  this.body = { artists };
});

router.post('/api/artists', function *(next) {
  let validation = new Validator(this.request.body, {
    name: 'required'
  });

  let artistWasAlreadyCreated = yield Artist.findOne({
    where: {
      name: this.request.body.name
    }
  });

  if (artistWasAlreadyCreated) {
    let response = new BadRequest({
      name: ['Artist already created']
    });
    this.status = response.status;
    return this.body = response.body;
  }

  if (validation.passes()) {
    let artist = Artist.build(this.request.body);
    yield artist.save();
    this.body = { artist };
  } else {
    let response = new BadRequest(validation.errors.all());
    this.status = response.status;
    this.body = response.body;
  }
});

router.get('/api/artists/:id', function *(next) {
  let artist = yield Artist.findById(this.params.id);
  this.body = { artist };
});

router.get('/api/artists/:id/songs', function *(next) {
  let songs = yield Song.findAll({
    where: {
      artist: this.params.id
    }
  });

  let artist = yield Artist.findById(this.params.id);
  this.body = { songs, artists: [ artist ] };
});

router.post('/api/songs', function *(next) {
  let validation = new Validator(this.request.body, {
    title: 'required',
    artist: 'required|numeric',
    genre: 'required|numeric',
    price: 'required|numeric',
    createdBy: 'required'
  });

  if (validation.passes()) {
    let song = Song.build(this.request.body);
    yield song.save();
    this.body = { song };
  } else {
    let response = new BadRequest(validation.errors.all());
    this.status = response.status;
    this.body = response.body;
  }
});

router.del('/api/songs/:id', function *(next) {
  let song = yield Song.findById(this.params.id);
  if (!song) {
    let response = new NotFoundResponse(`Song ${this.params.id} not found`);
    this.status = response.status;
    return this.body = response.body;
  }

  if (song.createdBy === 'admin') {
    let response = new ForbiddenResponse('This song cannot be deleted since it was created by the admin.');
    this.status = response.status;
    return this.body = response.body;
  }
  yield song.destroy();
  this.status = 204;
});

router.put('/api/songs/:id', function *(next) {
  let song = yield Song.findById(this.params.id);
  if (!song) {
    let response = new NotFoundResponse(`Song ${this.params.id} not found`);
    this.status = response.status;
    return this.body = response.body;
  }

  if (song.createdBy === 'admin') {
    let response = new ForbiddenResponse('This song cannot be deleted since it was created by the admin.');
    this.status = response.status;
    return this.body = response.body;
  }

  yield song.update(this.request.body);
  this.body = { song };
});

router.get('/code-challenges/1', function *(next) {
  // make a JSON-API response for songs and have students
  // create a function that returns a promise that resolves with an array of songs
  // findSongs().then(function(songs) {
  //    // songs is an array of songs where each element in the array is an object
  //    // containing the id, title, price, and playCount
  // })
  let songs = yield Song.findAll();

  this.body = {
    data: songs.map((song) => {
      return {
        type: 'songs',
        id: song.id,
        attributes: {
          'title': song.title,
          'price': song.price,
          'play-count': song.playCount
        }
      };
    })
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
