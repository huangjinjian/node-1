// argv命令行参数

// console.log(process.argv);


// 利用参数 写加法的计算器

let firstNum = parseInt(process.argv[2])

let secNum = parseInt(process.argv[3])

let sum = firstNum + secNum

console.log("计算结果为：" + sum);