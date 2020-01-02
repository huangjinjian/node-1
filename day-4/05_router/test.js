const wait1 = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
			console.log("1s later")
		}, 5000)
	})
}

const wait2 = () => {
	return new Promise((resolve) => {
		resolve(setTimeout(() => {
			console.log("2s later")
		}, 2000))
	})
}
async function test() {
	const a = await wait1()
	const b = await wait2()

	console.log(a);
	console.log(b);
	console.log("end")
}
console.log("start")
test()