const mysql = require('mysql')
let config = require('../config')

var pool = mysql.createPool(config.dbOpt)

let db = {};

// 封装了mysql查询的功能

db.q = (sql, params) => {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			// 使用连接  params参数是数组
			connection.query(sql, params, (error, results) => {
				// 释放连接
				connection.release();
				console.log(sql, params, results);

				if (error) return reject(err);
				// 成功传递数据
				resolve(results);

			});
		});
	});
}

// 导出db对象
module.exports = db;