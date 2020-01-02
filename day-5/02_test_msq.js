const db = require('./sql')




// 插入数据
async function insert(params) {
	try {
		let result = await db.q('insert into userlist (username , password , email) values (?,?,?)', ["meiguo", "123123", "827391061@qq.com"])
		console.log(result);
	} catch {
		console.log(err);
	}
}

async function insert2(params) {
	try {
		let result = await db.q('insert into user (user , password , email) values ("meiguo", "123123", "827391061@qq.com")')
		console.log(result);
	} catch {
		console.log(err);
	}
}
insert()



// 查询数据
async function refer(params) {
	try {
		let result = await db.q('select * from test_sql')
		console.log(result);
	} catch {
		console.log(err);
	}
}
// refer()

// 删除数据
async function deleteData(params) {
	try {
		let result = await db.q('delete from test_sql')
		console.log(result);
	} catch {
		console.log(err);
	}
}

// deleteData()