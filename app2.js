const app = require('koa')();
const router = require('koa-router')();
const Genre = require('./models/Genre');
const Artist = require('./models/Artist');
const Song = require('./models/Song');
const cors = require('koa-cors');

// app.use(function *(){
//   this.set('Access-Control-Allow-Origin', '*');
// });

app.use(cors());

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

router.get('/api/artists/:id/songs', function *(next) {
  let songs = yield Song.findAll({
    where: {
      artist: this.params.id
    }
  });

  let artist = yield Artist.findById(this.params.id)
  this.body = { songs, artists: [ artist ] };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
