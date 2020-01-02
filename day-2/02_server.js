const http = require("http")

const server = http.createServer((req, res) => {

	res.end("xxx")

}).listen(8484, () => {
	console.log("start");
})