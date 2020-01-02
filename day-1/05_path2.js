// path 核心模块的

let path = require("path")

// parse 方法 是将路径转为一个对象

console.log(path.parse(__filename));

// { root: 'C:\\',
//   dir: 'C:\\Users\\Administrator\\Desktop\\code\\day-1',
//   base: '05_path2.js',
//   ext: '.js',
//   name: '05_path2' }

// 可以改base属性 不可以改ext 和name 属性

let obj = path.parse(__filename)
obj.base = '05_path2.obj'

// format 方法是将对象转为路径

console.log(path.format(obj));

// C: \Users\ Administrator\ Desktop\ code\ day - 1\ 05 _path2.obj