const db = require("../models/db")

module.exports = {
	register(username, password, email) {
		return db.q('insert into userlist (username , password , email) values (?, ?, ?)', [username, password, email])
	},
	findUsername(username) {
		return db.q('select * from userlist where username=?', [username])
	},
	checkLogin(username, password) {
		return db.q('select * from userlist where username=? and password=?', [username, password])
	}
}