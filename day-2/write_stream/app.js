let http = require("http")
let path = require("path")
let fs = require("fs")

let server = http.createServer((req, res) => {
	if (req.url === "/") {
		let myPath = path.resolve(__dirname, "index.html")
		let file = fs.readFileSync(myPath)
		res.end(file)
	} else if (req.url === "/test" && req.method === "GET") {
		res.writeHead(200, {
			'content-type': 'application/octet-stream'
		})
		setInterval(() => {
			res.write(new Date().getSeconds() + "^^")
		}, 1000)
	}
}).listen(8282, () => {
	console.log("start");
})