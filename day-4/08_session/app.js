const Koa = require('koa')
const path = require('path')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-art-template')
const session = require('koa-session');

let all = require('./public/lib/global')

const {
	io
} = require('./public/lib/socket')

const app = new Koa()
const router = new Router()

app.keys = ['some secret hurr']

io.attach(app)

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

let store = {
	store: {},
	get(key) {
		return this.store[key]
	},
	set(key, session) {
		this.store[key] = session
	},
	destroy(key) {
		delete this.store[key]
	},
}

app.use(session({
	store: store
}, app));
// 中间件
app.use(bodyParser())



// 静态资源
render(app, {
	root: path.join(__dirname, 'view'),
	extname: '.html',
	debug: process.env.NODE_ENV !== 'production'
});

let msgArr = [{
		userName: 'cn',
		msg: "欢迎来到中国"
	},
	{
		userName: 'usa',
		msg: "welcome"
	}
]


router.get('/', async (ctx, next) => {
	ctx.render('index', {
		msg: "我是渲染出来的参数"
	});
}).post("/login", async ctx => {
	let userName = ctx.request.body.userName
	let id = new Date().getTime()
	ctx.session.user = {
		userName,
		id
	}
	global.mySessionStore[id] = {
		userName
	}
	ctx.redirect("/list")
}).get("/list", async ctx => {
	if (ctx.session.user) {
		ctx.render("list", {
			msgArr,
			userName: ctx.session.user.userName,
			timeId: ctx.session.user.id
		})
	} else {
		ctx.redirect("/")
	}
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
app.listen(3111, () => {
	console.log('start')
})