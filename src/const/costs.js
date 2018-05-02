let cost = {
	'April': [],
	'May': [
		[{
				type: 'cost',
				count: 50,
				way: '话费',
				description: '月结充值',
				from: '银行卡',
			},
			{
				type: 'cost',
				count: 70,
				way: '交通',
				description: '51返程大巴',
				from: '银行卡',
			},
			{
				type: 'cost',
				count: 24,
				way: '网费',
				description: '每月网费',
				from: '银行卡',
			}
		],
		[
			{
				type: 'cost',
				count: 4,
				way:　'交通',
				description: '地铁上班',
				from: '羊城通',
			},
			{
				type: 'cost',
				count: 4.5,
				way:　'食物',
				description: '买早餐',
				from: '银行卡',
			},
			{
				type: 'cost',
				count: 39,
				way: '其他',
				description: '大扫除工具购买',
				from: '银行卡',
			},
			{
				type: 'cost',
				count:50,
				way: '交通',
				description: '羊城通充值',
				from: '银行卡',
			}
		]
	]
};
cost['April'][25] = [{
		type: 'cost',
		count: 　4.5,
		way: 　 '食物',
		description: '买早餐',
		from: '银行卡',
	},
	{
		type: 　 'cost',
		count: 13.1,
		way: '食物',
		description: '买水果',
		from: '银行卡',
	},
	{
		type: 　 'cost',
		count: 1.2,
		way: '交通',
		description: '地铁上班',
		from: '羊城通',
	},
];
cost['April'][26] = [{
	type: 　 'cost',
	count: 1.2,
	way: '交通',
	description: '地铁上班',
	from: '羊城通',
}]
cost['April'][27] = [{
	type: 　 'cost',
	count: 4.5,
	way: '食物',
	description: '早餐',
	from: '银行卡',
}]
cost['April'][28] = [{
		type: 'cost',
		count: 52,
		way: '交通',
		description: '51节坐大巴',
		from: '银行卡',
	},
	{
		type: 'cost',
		count: 30,
		way: '话费',
		description: '手机充值话费',
		from: '银行卡',
	}
]
cost['April'][29] = [{
	type: 'cost',
	count: 5,
	way: '流量',
	description: '手机充值流量',
	from: '银行卡',
}, {
	type: 'cost',
	count: 108,
	way: '食物',
	description: '买米',
	from: '银行卡',
}]
export {
	cost
}
