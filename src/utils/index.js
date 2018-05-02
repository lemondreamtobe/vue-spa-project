export default {
	monthCollect: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	isNumber(val) {
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(val) || regNeg.test(val)) {
			return true;
		} else {
			return false;
		}
	},
	updateTotalView(obj, money, tabledata, type) {
		//更新现有资产
		switch (obj.cost_type) {
			case "现金":
				money[1].count = type == 'cost' ? (money[1].count - obj.cost_count) : (money[1].count + obj.cost_count);
				break;
			case "羊城通":
				money[2].count = type == 'cost' ? (money[2].count - obj.cost_count) : (money[2].count + obj.cost_count);
				break;
			default:
				money[0].count = type == 'cost' ? (money[0].count - obj.cost_count) : (money[0].count + obj.cost_count);
		}
		money[3].count = type == 'cost' ? (money[3].count - obj.cost_count) : (money[3].count + obj.cost_count);
		let cost_data = tabledata.filter(
			(value, index) => value.type == "cost"
		);
		let cost_total = 0;
		for (let i of [...cost_data]) {
			cost_total += i.count;
		}
		let get_data = tabledata.filter(
			(value, index) => value.type == "get"
		);
		let get_total = 0;
		for (let i of [...get_data]) {
			get_total += i.count;
		}
		money[money.length - 1].count =
			get_total - cost_total;
		money[money.length - 2].count =
			Math.trunc(get_total / (cost_total + get_total)) + "%";
	},
	getRandom(much) {
		let arr = [];
		for (let i = 0; i < much; i++) {
			arr[i] = Math.floor(Math.random() * (9 - 0 + 1) + 0);
		};
		return arr;
	},
	validatenull(val) {
		if (val instanceof Array) {
			if (val.length == 0) return true;
		} else if (val instanceof Object) {
			if (JSON.stringify(val) === '{}') return true;
		} else {
			if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
			return false;
		}
		return false;

	},
	isvalidatemobile(phone) {
		let list = [];
		let result = true;
		let msg = '';
		var isPhone = /^0\d{2,3}-?\d{7,8}$/;
		//增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]  
		var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
		if (!this.validatenull(phone)) {
			if (phone.length == 11) {
				if (isPhone.test(phone)) {
					msg = '手机号码格式不正确';
				} else {
					result = false;
				}
			} else {
				msg = '手机号码长度不为11位';
			}
		} else {
			msg = '手机号码不能为空';
		}
		list.push(result);
		list.push(msg);
		return list;
	},
	getPreMonth(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份
		var month = arr[1]; //获取当前日期的月份
		var day = arr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中月的天数
		var year2 = year;
		var month2 = parseInt(month) - 1;
		if (month2 == 0) { //如果是1月份，则取上一年的12月份
			year2 = parseInt(year2) - 1;
			month2 = 12;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if (day2 > days2) { //如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
			day2 = days2;
		}
		if (month2 < 10) {
			month2 = '0' + month2; //月份填补成2位。
		}
		var t2 = year2 + '-' + month2 + '-' + day2;
		return t2;
	},
	getLineData(obj) {
		let length = 30;
		let cost_count = [];
		let cost_day = [];
		let now = new Date();
		let current_month = this.monthCollect[now.getMonth()];
		for (let i = 0; i < obj[current_month].length; i++) {

			if (!obj[current_month][i]) {
				cost_count[i] = 0;
				cost_day.push((now.getMonth() + 1) + '.' + (i + 1));
			} else {
				let total = 0;
				obj[current_month][i].forEach(function (val, ind) {
					total += val.count;
				});
				cost_count[i] = total;
				cost_day.push((now.getMonth() + 1) + '.' + (i + 1));
			}
		}

		if (cost_count.length > 30) {
			let distance = cost_count.length - 30;
			cost_day.splice(0, distance);
			cost_count.splice(0, distance);
			return {
				count: cost_count,
				　
				day: day_count
			}
		} else if (cost_count.length < 30) {
			let prev_cost_count = [];
			let prev_cost_day = [];
			let distances = 30 - cost_count.length;
			let prev = new Date(now.setMonth(now.getMonth() - 1));
			let prev_month = this.monthCollect[prev.getMonth()];
			prev = new Date(prev.setMonth(prev.getMonth() + 1));
			prev.setDate(0);
			let prev_day = prev.getDate() - 1;
			for (let j = 0; j < distances; j++) {

				if (!obj[prev_month][prev_day - j]) {
					prev_cost_count[prev_day - j] = 0;
					prev_cost_day[prev_day - j] = ((prev.getMonth() + 1) + '.' + (prev_day - j + 1));
				} else {
					let total = 0;
					obj[prev_month][prev_day - j].forEach(function (val, ind) {
						total += val.count;
					});
					prev_cost_count[prev_day - j] = total;
					prev_cost_day[prev_day - j] = ((prev.getMonth() + 1) + '.' + (prev_day - j + 1));
				}
			};
			prev_cost_count.splice(0, cost_count.length);
			prev_cost_day.splice(0, cost_count.length);
			return {
				count: [...prev_cost_count, ...cost_count],
				　
				day: [...prev_cost_day, ...cost_day]　
			}
		} else {
			return {
				count: cost_count,
				　
				day: cost_day
			}
		}
	},
	addGet(arr, aim) {
		arr.forEach((value, index) => {
			switch (value.way) {
				case '工资':
					aim[0].value = aim[0].value + value.count;
					break;
				case '股票':
					aim[1].value = aim[1].value + value.count;
					break;
				case '兼职':
					aim[2].value = aim[2].value + value.count;
					break;
			}
		})
	},
	addCost(arr, aim) {
		arr.forEach((value, index) => {
			switch (value.way) {
				case '食物':
					aim[0].value = aim[0].value + value.count;
					console.log(value.count);
					break;
				case '交通':
					aim[1].value = aim[1].value + value.count;
					console.log(value.count);
					break;
				case '话费':
					aim[2].value += value.count;
					console.log(value.count);
					break;
				case '流量':
					aim[3].value += value.count;
					console.log(value.count);
				case '网费':
					aim[4].value += value.count;
					break;
				case'其他':
					aim[5].value += value.count;
			}
		})
	},
	getRingGetData(obj) {
		let all_get = [{
				name: '工资',
				value: 0,
			},
			{
				name: '股票',
				value: 0,
			},
			{
				name: '兼职',
				value: 0,
			}
		];

		//根据选择时间
		let now = new Date();
		let current_month = this.monthCollect[now.getMonth()];
		let datalen = obj[current_month].length;

		if (datalen > 30) {
			let distance = datalen - 30;
			for (; distance < datalen; distance++) {

				if (!obj[current_month][distance]) {

				} else {
					this.addGet(obj[current_month][distance], all_get)
				}
			}
		} else if (datalen < 30) {
			obj[current_month].forEach((value, index) => {

				if (!value) {

				} else {
					this.addGet(value, all_get)
				}
			});
			let distances = 30 - datalen;

			//选择上月时间
			let prev = new Date(now.setMonth(now.getMonth() - 1));
			let prev_month = this.monthCollect[prev.getMonth()];
			prev = new Date(prev.setMonth(prev.getMonth() + 1));
			prev.setDate(0);
			let prev_day = prev.getDate();

			for (let i = (obj[prev_month].length - distances); i < obj[prev_month].length; i++) {

				if (!obj[prev_month][i]) {

				} else {
					this.addGet(obj[prev_month][i], all_get)
				}
			}
		} else {
			for (let i of obj[current_month]) {

				if (i) {
					this.addGet(i, all_get);
				}
			}
		}
		return {
			all: all_get
		}
	},
	getRingCostData(obj) {
		let all_cost = [{
				name: '食物',
				value: 0,
			},
			{
				name: '交通',
				value: 0,
			},
			{
				name: '话费',
				value: 0,
			},
			{
				name: '流量',
				value: 0,
			},
			{
				name: '网费',
				value: 0,
			},
			{
				name: '其他',
				value: 0,
			}
		];

		//根据选择时间
		let now = new Date();
		let current_month = this.monthCollect[now.getMonth()];
		let datalen = obj[current_month].length;

		if (datalen > 30) {
			let distance = datalen - 30;
			for (; distance < datalen; distance++) {

				if (!obj[current_month][distance]) {

				} else {
					this.addCost(obj[current_month][distance], all_cost)
				}
			}
		} else if (datalen < 30) {
			obj[current_month].forEach((value, index) => {

				if (!value) {

				} else {
					this.addCost(value, all_cost)
				}
			});
			let distances = 30 - datalen;

			//选择上月时间
			let prev = new Date(now.setMonth(now.getMonth() - 1));
			let prev_month = this.monthCollect[prev.getMonth()];
			prev = new Date(prev.setMonth(prev.getMonth() + 1));
			prev.setDate(0);
			let prev_day = prev.getDate();

			for (let i = (obj[prev_month].length - distances); i < obj[prev_month].length; i++) {

				if (!obj[prev_month][i]) {

				} else {
					this.addCost(obj[prev_month][i], all_cost)
				}
			}

		} else {
			for (let i of obj[current_month]) {

				if (i) {
					this.addCost(i, all_cost);
				}
			};
		}
		return {
			all: all_cost
		}
	}
}
