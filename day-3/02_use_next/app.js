const express = require("express")

const server = express()

server.use("/baicai", (req, res, next) => {
	console.log("baicai");
	// res.send("1")
	res.redirect('http://localhost:6060/putao')
	console.log(1);
	// next()
})

server.use("/baicai", (req, res) => {
	console.log(req.url);
	console.log("huluobo");
	res.send('1')
})

server.use("/putao", (req, res) => {
	console.log(2);
	console.log("putao");
})

server.listen(6060, () => {
	console.log("start");
})