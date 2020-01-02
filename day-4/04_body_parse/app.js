const Koa = require("koa")
var bodyParser = require('koa-bodyparser');


const app = new Koa()



app.use(bodyParser());

app.use(async ctx => {
	ctx.body = ctx.request.body
})






app.listen(5665, () => {
	console.log("start");
})