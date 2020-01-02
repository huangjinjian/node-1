const Koa = require('koa')
const path = require('path')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-art-template')
const session = require('koa-session');

let all = require('./public/lib/global')

const app = new Koa()
const router = new Router()


// const {
// 	io
// } = require('./public/lib/socket')
const IO = require('koa-socket')
const io = new IO()
io.attach(app)
io.on('connection', (ctx) => {
	// global.mySessionStore[ctx.data.id]['socketId'] = ctx.socket.socket.id
})
io.on('login', (ctx) => {
	global.mySessionStore[ctx.data.id]['socketId'] = ctx.socket.socket.id
	io.broadcast('login', {
		msg: '用户' + global.mySessionStore[ctx.data.id].userName + '上线了'
	})
	updateOnline();
})

// 转发信息
io.on("sendMsg", (ctx) => {
	let user = global.findBySocketId(ctx.socket.socket.id)
	io.broadcast('receiveMsg', {
		msg: ctx.data.msg,
		userName: user.userName
	})
})

// 下线
io.on('disconnect', (ctx) => {
	io.broadcast("downLine", {
		msg: '用户' + global.findBySocketId(ctx.socket.socket.id).userName + '下线了'
	})
	let timestamp = global.getTimestamp(ctx.socket.socket.id)
	delete global.mySessionStore[timestamp]
	updateOnline();
})

// 更新在线人数
function updateOnline() {
	io.broadcast("updateOnline", {
		Online: global.mySessionStore
	})
}

// 处理私聊
io.on("privateMsg", (ctx) => {
	let userName = global.findBySocketId(ctx.socket.socket.id).userName
	app._io.to(ctx.data.privateSocketId).emit('acceptPrivate', {
		userName,
		msg: ctx.data.privateMsg
	})
})
// 加入群
io.on('addGroup', (ctx) => {
	ctx.socket.socket.join(ctx.data.type);
	let userName = global.findBySocketId(ctx.socket.socket.id).userName
	app._io.to(ctx.data.type).emit('groupMsg', {
		type: ctx.data.type,
		msg: '用户' + userName + '加入该群'
	})
})

// 群聊
io.on('groupMsg', (ctx) => {
	let userName = global.findBySocketId(ctx.socket.socket.id).userName
	app._io.to(ctx.data.type).emit('groupMsg', {
		type: ctx.data.type,
		msg: '用户' + userName + '发了：' + ctx.data.msg
	})
})


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


module.exports = {
	app
}