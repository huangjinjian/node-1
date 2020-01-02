const Koa = require("koa")

const app = new Koa()



app.use((ctx, next) => {
	console.log(ctx.headers);
	console.log(ctx.url);
	console.log(ctx.method)
	// 	{ host: 'localhost:8989',
	//   connection: 'keep-alive',
	//   'cache-control': 'max-age=0',
	//   'upgrade-insecure-requests': '1',
	//   'user-agent':
	//    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
	//   accept:
	//    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	//   'accept-encoding': 'gzip, deflate, br',
	//   'accept-language': 'zh-CN,zh;q=0.9',
	//   cookie: 'location=113.3732888343,23.1249358877' }
	// /
	// GET
	next()
})


app.use(ctx => {


	ctx.body = "<h1>大家好</h1>"
})






app.listen(8989, () => {
	console.log("start");
})