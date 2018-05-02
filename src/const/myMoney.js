let myMoney = [{
		type: '银行卡',
		count: 0,
		icon: 'glyphicon glyphicon-credit-card'
	},
	{
		type: '现金',
		count: 150,
		icon: 'glyphicon glyphicon-usd'
	},
	{
		type: '羊城通',
		count: 50,
		icon: 'glyphicon glyphicon-tower'
	},
	{
		type: '支出占比',
		count: '0%',
		icon: 'glyphicon glyphicon-globe'
	},
	{
		type: '开支总差',
		count: '0',
		icon: 'glyphicon glyphicon-transfer'
	},
];
myMoney.splice(3, 0, {
	type: '总资产',
	count: (+myMoney[0].count) + (+myMoney[1].count) + (+myMoney[2].count),
	icon: 'glyphicon  glyphicon-signal'
});
let mmLink = {
	'银行卡': myMoney[0],
	'现金': myMoney[1],
	'羊城通': myMoney[2],
	'总资产': myMoney[3],
	'支出占比': myMoney[4],
	'开支总差': myMoney[5],
	init: true,
}
export {
	myMoney,
	mmLink,
}
