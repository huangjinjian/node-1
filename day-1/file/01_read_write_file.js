// fs.readFile(path,encoding,fn)

// 读取文件

const fs = require("fs")

// fs.readFile(__dirname + "/text.txt", "utf8", (err, data) => {
// 	if (err) throw err;
// 	else {
// 		console.log(data);
// 	}
// })

// 写入文件

// fs.write(path, data, fn)

// fs.writeFile(__dirname + '/msg.txt', "fs写入的方法，覆盖", () => {
// 	console.log("写入成功");
// })


// 追加

fs.appendFile(__dirname + '/msg.txt', "fs追加的方法,追加内容", () => {
	console.log("追加成功");
})