const IO = require('koa-socket')
const io = new IO()
io.on('connection', (ctx) => {

})


io.on('login', (ctx) => {
	global.mySessionStore[ctx.data.id]['socketId'] = ctx.socket.socket.id
	console.log(global.mySessionStore);
	io.broadcast('login', {
		msg: '用户' + global.mySessionStore[ctx.data.id].userName + '上线了'
	})
	updateOnline();
})

// 转发信息
io.on("sendMsg", (ctx) => {
	let user = global.findBySocketId(ctx.socket.socket.id)
	io.broadcast('receiveMsg', {
		msg: ctx.data.msg,
		userName: user.userName
	})
})

// 下线
io.on('disconnect', (ctx) => {
	io.broadcast("downLine", {
		msg: '用户' + global.findBySocketId(ctx.socket.socket.id).userName + '下线了'
	})
	let timestamp = global.getTimestamp(ctx.socket.socket.id)
	delete global.mySessionStore[timestamp]
	updateOnline();
})


function updateOnline() {
	io.broadcast("updateOnline", {
		Online: global.mySessionStore
	})
}

module.exports = {
	io
}