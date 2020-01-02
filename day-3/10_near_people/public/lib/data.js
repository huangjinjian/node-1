// db.shop.insert({"loc": [10, 10]});
// db.shop.insert({"loc": [11, 10]});
// db.shop.insert({"loc": [10, 11]});
// db.shop.insert({"loc": [12, 15]});
// db.shop.insert({"loc": [16, 17]});
// db.shop.insert({"loc": [90, 90]});
// db.shop.insert({
// 	name: "cn",
// 	"loc": [123.3732888343, 24.1249358877]
// })
// db.shop.createIndex({
// 	"loc": "2dsphere"
// });
// db.shop.aggregate([{
// 	"$geoNear": {
// 		"near": {
// 			type: "Point",
// 			coordinates: [123.3732888343, 24.1249358877]
// 		},
// 		"distanceField": "loccc",
// 		"spherical": true
// 	}
// }])
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'test'

let obj = {}

const connect = function (callback) {
	const client = new MongoClient(url)
	client.connect(function (err) {
		if (err) throw err
		const db = client.db(dbName)
		console.log('Connected successfully to server')
		callback(client, db)
	})
}

// 创建索引
obj.createIndex = (cName, fn) => {
	connect((client, db) => {
		db.collection(cName).createIndex({
				loc: '2dsphere'
			},
			(err, result) => {
				fn(err, result)
				client.close()
			}
		)
	})
}

// 插入

obj.insert = (cName, arrData, fn) => {
	connect((client, db) => {
		db.collection(cName).insertMany(arrData, (err, result) => {
			fn(err, result)
			client.close()
		})
	})
}

// 附近的人

obj.nearDis = (cName, arrLoc, fn) => {
	// 创建索引
	connect((client, db) => {
		db.collection(cName)
			.aggregate([{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [parseFloat(arrLoc[0]), parseFloat(arrLoc[1])]
					},
					distanceField: 'loc',
					spherical: true
				}
			}])
			.toArray((err, docs) => {
				fn(err, docs)
				client.close()
			})
	})
}

// obj.createIndex("loc-list", (err, result) => {
// 	if (err) throw err
// 	console.log(result);
// })

// obj.insert("loc-list", [{
// 	name: "员村",
// 	loc: [123.3732888343, 24.1249358877]
// }], (err, result) => {
// 	if (err) throw err
// 	console.log(result);
// })

// obj.nearDis("loc-list", [123.3732888343, 23.1249358877], (err, docs) => {
// 	if (err) throw err
// 	console.log(docs);
// })