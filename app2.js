const app = require('koa')();
const router = require('koa-router')();
const Genre = require('./models/Genre');
const Artist = require('./models/Artist');
const Song = require('./models/Song');

router.get('/api/genres', function *(next) {
  this.body = yield Genre.findAll();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
