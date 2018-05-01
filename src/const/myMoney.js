let myMoney = [{
		type: '银行卡',
		count: 26000,
		icon: 'glyphicon glyphicon-credit-card'
	},
	{
		type: '现金',
		count: 150,
		icon: 'glyphicon glyphicon-usd'
	},
	{
		type: '羊城通',
		count: 20,
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
export {
	myMoney
}
