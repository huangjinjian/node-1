const express = require("express")

const server = express()


server.get("/login", (req, res) => {
		res.send("login")
	})

	.get("/register", (req, res) => {
		res.send("register")
	})

server.listen(2626, () => {
	console.log("start");
})