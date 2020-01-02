// console.log(a);

// let a = 1


// let [a, b, c] = [1, 2, 3]
// console.log(a, b, c);

// let [a ,[[b],c]] = [1,[[2],3]]
// console.log(a, b, c);

// let [a, , b] = [1, 2, 3]
// console.log(a, b);  1 ,3

// let [a, b] = [1]
// console.log(a, b) 1 unde

// let [a, ...b] = [1, 2, 3, 4, 5]
// console.log(a, b) 1 [ 2, 3, 4, 5 ]

// let [a, b, c, d, e] = "abced"
// console.log(a, b, c, d, e) a b c e d


// 解构默认值得，当匹配的结果为undefined的时候 就触发默认值

// let [a = 1, b = a] = [2]
// console.log(a, b); 2 2

// let [a = 1, b = a] = []
// console.log(a, b) 1 1

// let {
// 	foo,
// 	bar
// } = {
// 	foo: 11,
// 	bar: 22	
// }
// console.log(foo, bar);  11 22

// 忽略
// let {
// 	a
// } = {
// 	a: 2,
// 	b: 3
// }
// console.log(a);

// 嵌套
// let {
// 	a,
// 	b: {
// 		y
// 	}
// } = {
// 	a: "aa",
// 	b: {
// 		y: "world"
// 	},
// 	c: 1
// }

// console.log(a, y); aa world

// 不完全

// let {
// 	a,
// 	b,
// 	c
// } = {
// 	a: 1,
// 	b: 2
// }
// console.log(a, b, c);1 2 undefined


// 剩余

// let {
// 	a,
// 	b,
// 	...c
// } = {
// 	a: "aa",
// 	b: "bb",
// 	d: "dd",
// 	e: "ee"
// }

// console.log(a, c, b); aa { d: 'dd', e: 'ee' } bb


// 