const path = require('path')


module.exports = {
	dbOpt: {
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'test'
	},
	staticDir: path.resolve('./public'),
	templateOpt: {
		root: path.resolve('./views'),
		extname: '.html',
		debug: process.env.NODE_ENV !== 'production'
	},
	uploadDir: path.join(__dirname, '/public/files'),
	sessionKey: ['some secret hurr'],
	sessionStore: {
		store: {},
		get(key) {
			return this.store[key]
		},
		set(key, session) {
			this.store[key] = session
		},
		destroy(key) {
			delete this.store[key]
		},
	}
}