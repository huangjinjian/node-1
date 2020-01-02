// res的扩展函数、

const express = require("express")
const path = require("path")

const server = express()


server.get("/json", (req, res) => {
		res.json({
			key: "keyValue"
		})
	})
	.get("/down", (req, res) => {
		res.download("./app.js")
	})
	.get("/redirect", (req, res) => {
		res.redirect("www.baidu.com")
	})



server.listen(6262, () => {
	console.log("start");
})