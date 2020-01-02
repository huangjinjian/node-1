const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 中间件
app.use(bodyParser())
app.use(router.routes())

// app.use(async ctx => {
// 	ctx.body = ctx.request.body
// })

router.get('/', (ctx, next) => {
		ctx.body = '首页'
	})
	.all("*", async ctx => {
		ctx.body = "你访问的路径不存在 三秒跳到首页"
	})

app.on('error', (err, ctx) => {
	ctx.body = "路径错误"
});

app.listen(5665, () => {
	console.log('start')
})