// 引入mongo 模块

const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'heros';

let obj = {}

const connect = function (callback) {
	const client = new MongoClient(url);
	client.connect(function (err) {
		if (err) throw err
		const db = client.db(dbName);
		console.log("Connected successfully to server");
		callback(client, db)
	});
}

// crud   增加 查 改 删
// 插入

obj.insert = (cName, arrData, fn) => {
	connect((client, db) => {
		db.collection(cName).insertMany(arrData, (err, result) => {
			fn(err, result);
			client.close()
		})
	})
}

// 查询

obj.find = (cName, options, fn) => {
	connect((client, db) => {
		db.collection(cName).find(options).toArray((err, docs) => {
			fn(err, docs)
			client.close()
		})
	})
}

// 改
obj.update = (cName, filter, updated, fn) => {
	connect((client, db) => {
		db.collection(cName).updateOne(filter, {
			$set: updated
		}, (err, result) => {
			fn(err, result)
			client.close()
		})
	})
}

obj.updateMany = (cName, filter, updated, fn) => {
	connect((client, db) => {
		db.collection(cName).updateMany(filter, {
			$set: updated
		}, (err, result) => {
			fn(err, result)
			client.close()
		})
	})
}



obj.delete = (cName, filter, fn) => {
	connect((client, db) => {
		db.collection(cName).deleteOne(filter, (err, result) => {
			fn(err, result)
			client.close()
		})
	})
}

obj.deleteMany = (cName, filter, fn) => {
	connect((client, db) => {
		db.collection(cName).deleteMany(filter, (err, result) => {
			fn(err, result)
			client.close()
		})
	})
}

module.exports = obj

// obj.delete("pro", {
// 	proName: "pro3"
// }, (err, result) => {
// 	if (err) throw err;
// 	console.log(result.result);
// })

// obj.deleteMany("pro", {
// 	proName: "pro5"
// }, (err, result) => {
// 	if (err) throw err;
// 	console.log(result.result);
// })

// 删除
// obj.updateMany("pro", {
// 	proName: "pro2"
// }, {
// 	size: ['s', 'm', 'l', 'xl']
// }, (err, result) => {
// 	if (err) throw err;
// 	console.log(result.result);
// })
// obj.update("pro", {
// 	proName: "pro1"
// }, {
// 	size: [1, 2, 3, 4]
// }, (err, result) => {
// 	if (err) throw err;
// 	console.log(result);
// })

// obj.find("pro", {}, (err, docs) => {
// 	if (err) throw err;
// 	console.log(docs);
// })



// 增
// obj.insert("pro", [{
// 	proName: "pro1",
// 	price: 123,
// 	imgUrl: 'www.baidu.com'
// }, {
// 	proName: "pro2",
// 	price: 123,
// 	imgUrl: 'www.baidu.com'
// }, {
// 	proName: "pro3",
// 	price: 123,
// 	imgUrl: 'www.baidu.com'
// }, {
// 	proName: "pro4",
// 	price: 123,
// 	imgUrl: 'www.baidu.com'
// }, {
// 	proName: "pro5",
// 	price: 123,
// 	imgUrl: 'www.baidu.com'
// }], (err, result) => {
// 	if (err) throw err;
// 	console.log(result);
// 	console.log(result.result);
// 	console.log(result.ops.length);
// })