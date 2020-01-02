// 需求

// 通过判断所给的路径 判断该路径是否存在 如果存在 则遍历该路径下的所有文件和目录


const fs = require("fs")
const path = require("path")

const myPath = path.resolve(__dirname, "test_dir")


// 判断是否为文件

try {
	fs.accessSync(myPath, "fs.constants.F_ok")
	// console.log("路径为文件");
	testReadFiles(myPath)
} catch (err) {
	console.log(err);
}


function testReadFiles(url) {
	// 第一获取文件的信息
	let stat = fs.statSync(url)
	if (stat.isFile()) {
		// 如果是文件的话直接输出
		console.log(url);
	} else if (stat.isDirectory()) {
		// 如果是目录的话，遍历 再回调自己
		fs.readdir(url, (err, files) => {
			if (err) throw err;
			// console.log(files);
			files.forEach((itemUrl) => {
				let sumPath = path.resolve(url, itemUrl)
				testReadFiles(sumPath)
			})
		})
	}
}