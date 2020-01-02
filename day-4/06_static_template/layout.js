const Koa = require('koa')
const path = require('path')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-art-template')

const app = new Koa()
const router = new Router()
app.use(require('koa-static')(path.join(__dirname, 'public')));
// 中间件

app.use(bodyParser())

render(app, {
	root: path.join(__dirname, 'view'),
	extname: '.html',
	debug: process.env.NODE_ENV !== 'production'
});
app.use(router.routes())

router.get('/', async (ctx, next) => {
	ctx.render('index', {
		msg: "我是渲染出来的参数"
	});
})

app.use(async (ctx, next) => {
	if (ctx.url.startsWith('/public')) {
		// /public/js/index.js
		// 改写请求url
		ctx.redirect(ctx.url.replace('/public', ''))
		// ctx.url = ctx.url.replace('/public', '');
	}
	// 放行，交给static来处理（不管如何都放行）
	// next();
});


// .all('*', async ctx => {
//   ctx.body = '你访问的路径不存在三秒跳到首页'
// })

// app.on('error', (err, ctx) => {
// 	ctx.body = '路径错误'
// })

app.listen(2324, () => {
	console.log('start')
})