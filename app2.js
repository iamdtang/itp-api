const app = require('koa')();
const router = require('koa-router')();
const Genre = require('./models/Genre');

router.get('/api/genres', function *(next) {
  this.body = yield Genre.findAll();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
