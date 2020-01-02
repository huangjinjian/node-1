const IO = require('koa-socket')
const io = new IO()

io.on('connection', (ctx) => {
	// global.mySessionStore[ctx.data.id]['socketId'] = ctx.socket.socket.id
})
io.on('login', (ctx) => {
	global.mySessionStore[ctx.data.id]['socketId'] = ctx.socket.socket.id
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

// 更新在线人数
function updateOnline() {
	io.broadcast("updateOnline", {
		Online: global.mySessionStore
	})
}

// 处理私聊  拿不到app
io.on("privateMsg", (ctx) => {
	console.log(ctx);
	let userName = global.findBySocketId(ctx.socket.socket.id).userName
	app._io.to(ctx.data.privateSocketId).emit('acceptPrivate', {
		userName,
		msg: ctx.data.privateMsg
	})
})

// 加入群
io.on('addGroup', (ctx) => {
	// console.log(ctx.data.type);
	ctx.socket.socket.join(ctx.data.type);
	console.log(ctx.socket.socket.rooms);
})

module.exports = {
	io
}