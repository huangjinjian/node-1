const Koa = require('koa')
const path = require('path')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-art-template')
const session = require('koa-session')

const app = new Koa()
const router = new Router()

app.keys = ['some secret hurr']
const CONFIG = {
	key: 'koa:sess',
	/** (string) cookie key (default is koa:sess) */
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 5000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
}
app.use(session(CONFIG, app));
// 中间件
app.use(bodyParser())

render(app, {
	root: path.join(__dirname, 'view'),
	extname: '.html',
	debug: process.env.NODE_ENV !== 'production'
});
router.get('/', async (ctx, next) => {
	ctx.render('index', {
		msg: "我是渲染出来的参数"
	});
}).post("/post", async ctx => {
	console.log(ctx.request.body);
	let name = ctx.request.body.userName
	let password = ctx.request.body.password
	if (name != "cn" || password != "123") {
		ctx.body = '账号和密码不对'
	} else {
		ctx.session.user = {
			userName: name
		}
		ctx.body = "登录成功"
	}
}).get("/list", async ctx => {
	console.log(ctx.session.user);
	ctx.render("list")
})
app.use(async (ctx, next) => {
	if (ctx.url.startsWith('/public')) {
		ctx.url = ctx.url.replace('/public', '');
	}
	await next();
});

// 静态资源一定要在路由后面
app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(router.routes())
app.listen(3232, () => {
	console.log('start22')
})