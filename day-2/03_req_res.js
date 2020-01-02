const http = require("http")

const server = http.createServer((req, res) => {

	// console.log(req.url);
	// console.log(req.method);
	// console.log(req.headers);

	req.on("data", (data) => {
		console.log(data.toString());
	})
	res.writeHead(200, {
		'Content-Type': 'text/html;charset=utf-8'
	})
	res.end("我是返回的数据")

}).listen("8686", () => {
	console.log("start");
})