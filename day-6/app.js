const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template')
const musicRouter = require('./routers/music')
const userRouter = require('./routers/user')
const koaFormidable = require('koa-formidable')
const session = require('koa-session');



let config = require('./config')

const app = new Koa()

render(app, config.templateOpt)

app.keys = config.sessionKey;

app.use(session({
	store: config.sessionStore
}, app));

// 重写URL,改掉/public
app.use(async (ctx, next) => {
	if (ctx.url.startsWith('/public')) {
		ctx.url = ctx.url.replace('/public', '')
	} else if (ctx.url == '/') {
		ctx.redirect('/user/login')
	}
	ctx.state.user = ctx.session.user
	await next()
})

/*** 中间件开始*/

app.use(koaFormidable({
	uploadDir: config.uploadDir, // 上传目录
	keepExtensions: true, // 保持原有后缀名
}))
app.use(bodyParser())
app.use(musicRouter.routes()).use(musicRouter.allowedMethods())
app.use(userRouter.routes())
app.use(require('koa-static')(config.staticDir))

/*** 中间件结束*/

app.listen(3638, () => {
	console.log('start')
})