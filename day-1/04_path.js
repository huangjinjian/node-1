// 核心模块

let path = require("path")


// join 方法 拼接路径
// console.log(path.join(__dirname, "//b//", "/////", "///c"));
// C:\Users\Administrator\Desktop\code\day-1\b\c

// resolve方法 路径返回绝对路径

console.log(path.resolve(__dirname, "a//", ".///c//", "../b/c"));

// C:\Users\Administrator\Desktop\code\day-1\a\b\c