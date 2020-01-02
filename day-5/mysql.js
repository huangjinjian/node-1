var mysql = require('mysql')
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test'
})

// pool.query('SELECT * FROM user', function(error, results, fields) {
//   if (error) throw error
//   console.log(results)
// })

const db = {}

db.q = function (sql, callback) {
	// 取出链接
	pool.getConnection(function (err, connection) {
		if (err) {
			callback(err, null);
			return;
		}
		connection.query(sql, function (error, results, fields) {
			// 释放连接
			connection.release();
			callback(error, results);
		});
	});
}


// 导出对象
module.exports = db;