const Koa = require("koa")
const fs = require("fs")

const app = new Koa()

let readFile = () => {
	return new Promise((res, rej) => {
		fs.readFile(__dirname + "/index.html", (err, data) => {
			console.log(2);
			if (err) {
				rej(err)
			}
			res(data)
		})
	})
}


app.use(async ctx => {
	if (ctx.url == "/") {
		ctx.set('content-type', 'text/html;charset=utf-8');
		try {
			ctx.body = await readFile()
		} catch {
			ctx.body = '返回首页'
		}
		console.log(1);
	}
})

app.listen("5666", () => {
	console.log("start");
})