const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(3);
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(2);
	ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
	console.log(1);
	ctx.body = 'Hello World';
});

app.listen(3000);