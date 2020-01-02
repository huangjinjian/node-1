const db = require("../models/db")

module.exports = {
	addMusic(title, singer, time, file, filelrc, userid) {
		return db.q('insert into musiclist (title , singer , time , file , filelrc , userid ) values (?, ?, ?, ?, ?, ?)', [title, singer, time, file, filelrc, userid])
	},
	updateMusic(id, title, singer, time, file, filelrc) {
		return db.q('update  musiclist set title=? , singer=? , time=? , file=? , filelrc=? where id=?', [title, singer, time, file, filelrc, id])
	},
	delMusic(id) {
		return db.q('delete from musiclist where id = ?', [id])
	},
	getMusics(userid) {
		return db.q('select * from musiclist where userid = ?', [userid])
	},
	getMusicItem(id) {
		return db.q('select * from musiclist where id = ?', [id])
	}
}