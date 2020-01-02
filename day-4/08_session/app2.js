const Koa = require("koa")

const app = new Koa()


let obj = {
	num: 1
}

app.use(ctx => {
	if (ctx.url == '/') {
		ctx.body = '第' + obj.num + '次访问'
		obj.num++
	}
})



app.listen(5656, () => {
	console.log("start");
})