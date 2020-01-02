const db = require('./mysql')



// 查找数据
// db.q('SELECT * FROM user where height>160', (err, result) => {
// 	if (err) throw err
// 	console.log(result);
// })
// insert into user ("","ca",1,178)


// 插入数据

db.q('insert into user (name ,sex,height) values ("ac",1,168)', (err, result) => {
	if (err) throw err
	console.log(result);
})