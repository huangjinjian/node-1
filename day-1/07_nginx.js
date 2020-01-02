// 测试负载均衡

let http = require("http")

let server = http.createServer((req, res) => {
	res.end('9090')

}).listen(9090, () => {
	console.log("start");
})