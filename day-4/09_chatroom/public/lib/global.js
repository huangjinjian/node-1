global.mySessionStore = { //id代表获取session的时间戳  userName：用户名 、 cookieId：每个用户连接cookie分配的id
	// id:{
	// 	userName,
	// 	socketId,
	// }
}

global.findBySocketId = (socketId) => {
	for (timestamp in global.mySessionStore) {
		if (global.mySessionStore[timestamp]['socketId'] == socketId) {
			return global.mySessionStore[timestamp]
		}
	}
}

global.getTimestamp = (socketId) => {
	for (timestamp in global.mySessionStore) {
		if (global.mySessionStore[timestamp]['socketId'] == socketId) {
			return timestamp
		}
	}
}