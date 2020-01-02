const express = require("express")

const server = express()

server.use((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html;charset=utf-8'
	})
	res.end("你好")
})

server.listen(8181, () => {
	console.log("start");
})