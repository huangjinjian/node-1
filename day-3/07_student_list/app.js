// 需求：
// 创建一个服务器，用户可以填入名字 和 照片
// 然后照片上传到服务器

const express = require('express')
const path = require('path')
const app = express()
let formidable = require('formidable')

app.use(express.static('public'))
app.set('view engine', '.html')
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view options', {
	debug: process.env.NODE_ENV !== 'production',
})

let heros = {}

app.get('/', (req, res) => {
	console.log(heros);
	res.render('index', {
		heros,
		username: 123
	})
})


app.post('/api', (req, res) => {

	let form = new formidable.IncomingForm()
	form.uploadDir = path.join(__dirname + "/public/imgs")
	form.keepExtensions = true;
	form.parse(req, function (err, fields, files) {
		// console.log(fields)
		// console.log(files)
		let userName = fields.userName
		let fileUrl = path.parse(files.pic.path).base
		let fileName = files.pic.name
		heros = {
			name: userName,
			imgPath: fileUrl,
			imgName: fileName
		}
		res.redirect("http://localhost:6262/")
	})
})

app.listen(6262, () => {
	console.log('start')
})