const express = require("express")

const path = require("path")

const app = express()

app.use(express.static('public'))

app.set('view engine', '.html');
app.engine('html', require('express-art-template'));

app.set('views', path.join(__dirname, 'views'));

app.set('view options', {
	debug: process.env.NODE_ENV !== 'production'
});


app.get("/", (req, res) => {
	res.render('index', {
		name: 'art-template'
	})
})


app.listen(9393, () => {
	console.log("start");
})