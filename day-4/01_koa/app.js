const koa = require('koa')

const app = new koa()

app.use(async ctx => {
  ctx.body = 'Hello World'

  console.log(ctx.cookies)
})

app.listen(8888)
