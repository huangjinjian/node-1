let pro = new Promise((res, rej) => {
	rej("yse")
})

pro.then((data) => {
	console.log(data);
})

pro.catch((err) => {
	console.log("err");
})