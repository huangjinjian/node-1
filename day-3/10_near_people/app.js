// 需求：
// 创建一个服务器，用户可以填入名字 和 照片
// 然后照片上传到服务器

const express = require('express')
const path = require('path')
const app = express()
let formidable = require('formidable')

let db = require('./public/lib/dbTools')

app.use(express.static('public'))
app.set('view engine', '.html')
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view options', {
	debug: process.env.NODE_ENV !== 'production',
	imports: {
		time: 123
	}
})
// 首页
app.all('/', (req, res) => {
	res.render('index')
})


app.get('/list', (req, res) => {

	let locArr = req.headers.cookie.split("=")[1].split(",")
	console.log(locArr);
	db.nearDis('locList', [parseFloat(locArr[0]), parseFloat(locArr[1])], (err, docs) => {
		if (err) throw err;
		console.log(docs);
		res.render("list", {
			nearList: docs
		})
	})
})




app.post('/api', (req, res) => {
	let form = new formidable.IncomingForm()
	form.uploadDir = path.join(__dirname + '/public/imgs')
	form.keepExtensions = true
	form.parse(req, function (err, fields, files) {
		let userName = fields.userName
		let lng = fields.lng - 0
		let lat = fields.lat - 0
		let fileUrl = path.parse(files.pic.path).base
		let fileName = files.pic.name
		// 创建索引
		db.createIndex("locList", (err, result) => {
			if (err) throw err
			console.log(result)
			if (result == "loc_2dsphere") {
				db.insert(
					'locList',
					[{
						userName,
						fileUrl: 'http://localhost:6261/imgs/' + fileUrl,
						fileName,
						loc: [lng, lat]
					}],
					(err, result) => {
						if (err) throw err
						// res.setHeader("location", lng + "==" + lat)
						res.send({
							ok: 1
						})
					}
				)
			}
		})
	})
})

app.listen(6261, () => {
	console.log('start')
})