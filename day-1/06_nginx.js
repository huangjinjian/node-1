// 测试负载均衡

let http = require("http")

let server = http.createServer((req, res) => {
	res.end('8111')

}).listen(8111, () => {
	console.log("start");
})