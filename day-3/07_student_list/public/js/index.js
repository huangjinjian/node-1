let inventory = [{
		"_id": 1,
		"sku": "almonds",
		description: "product 1",
		"instock": 120
	},
	{
		"_id": 2,
		"sku": "bread",
		description: "product 2",
		"instock": 80
	},
	{
		"_id": 3,
		"sku": "cashews",
		description: "product 3",
		"instock": 60
	},
	{
		"_id": 4,
		"sku": "pecans",
		description: "product 4",
		"instock": 70
	},
	{
		"_id": 5,
		"sku": null,
		description: "Incomplete"
	},
	{
		"_id": 6
	}
]
































// let list = [{
// 		"name": "stu1",
// 		"score": 49,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu2",
// 		"score": 99,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu3",
// 		"score": 90,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu4",
// 		"score": 78,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu5",
// 		"score": 55,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu6",
// 		"score": 92,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu7",
// 		"score": 82,
// 		"classify": 1
// 	},
// 	{
// 		"name": "stu8",
// 		"score": 82,
// 		"classify": 2
// 	}
// ]


// db.stu.aggregate([{
// 	$group: {
// 		_id: "$classify",
// 		average: {
// 			$avg: "$score"
// 		}
// 	}
// }])