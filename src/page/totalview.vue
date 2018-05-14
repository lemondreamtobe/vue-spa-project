<template>
	<div class="left-bottom">
		<div class="index-title">个人资产</div>
		<div class="personal-info">
			<el-row>
				<el-col :span="4" v-for="item in items" :key="item.id">
					<div class="butstyle">
						<div class="info-li">
							{{item.type}}
						</div>
						<div class="info-count">
							{{item.count}}
						</div>
						<div class="info-li">
							<span :class="item.icon"></span>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="index-title">收支统计</div>
		<div class="person-echart">

			<chart :auto-resize="resize" style="width: 100%;height: 300px;position: absolute;top: 10%;" :options="lineoption" :theme="macarons"></chart>
		</div>
		<div class="person-echart">
			<el-row>
				<el-col :span="8">
					<chart :auto-resize="resize" style="width: 100%;height: 262px;position: absolute;top: 10%;" :options="ringoption_cost" :theme="macarons"></chart>
				</el-col>
				<el-col :span="8">
					<chart :auto-resize="resize" style="width: 100%;height: 262px;position: absolute;top: 10%;" :options="ringoption_get" :theme="macarons"></chart>
				</el-col>
				<el-col :span="8">
					<chart :auto-resize="resize" style="width: 100%;height: 262px;position: absolute;top: 10%;" :options="ringoption_rate" :theme="macarons"></chart>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import Vue from "vue";
	import ECharts from "vue-echarts/components/ECharts.vue";
	import "echarts/lib/chart/line";
	import "echarts/lib/component/tooltip";
	require("echarts/theme/macarons");
	require("echarts/theme/shine");
	Vue.component("chart", ECharts);
	import {
		myMoney,
		mmLink
	} from "../const/myMoney.js";
	import {
		cost
	} from "../const/costs.js";
	import {
		gets
	} from "../const/get.js";
	import {
		tabledata
	} from "../const/table.js";
	export default {
		data() {
			return {
				tabledata: [],

				//个人资产信息
				items: [],
				mmLink: {},

				//表格配置项
				resize: true,
				macarons: "macarons",
				roma: "shine",
				lineoption: {
					title: {
						text: "过去30日消费情况",
						subtext: ""
					},
					tooltip: {
						trigger: "axis"
					},
					grid: {
						top: "20%"
					},
					legend: {
						data: ["最高消费", "最低消费"]
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: false
							},
							dataView: {
								show: false,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ["line", "bar"]
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: false
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: "category",
						boundaryGap: false,
						data: [],
						name: '日期',
					}],
					yAxis: [{
						type: "value",
						axisLabel: {
							formatter: "{value} ¥"
						},
						name: '消费金额'
					}],
					series: [{
						name: "消费情况",
						type: "line",
						data: [],
						markPoint: {
							data: [{
									type: "max",
									name: "最大值"
								},
								{
									type: "min",
									name: "最小值"
								}
							]
						},
						markLine: {
							data: [{
								type: "average",
								name: "平均值"
							}]
						}
					}]
				},
				ringoption_cost: {
					title: {
						text: "过去30日消费去向",
						subtext: "",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						x: "left",
						data: ["交通", "食物", "话费", "流量", "网费", "其他"]
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: false
							},
							dataView: {
								show: false,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ["pie", "funnel"],
								option: {
									funnel: {
										x: "25%",
										width: "50%",
										funnelAlign: "left",
										max: 1548
									}
								}
							},
							restore: {
								show: false
							},
							saveAsImage: {
								show: false
							}
						}
					},
					calculable: true,
					series: [{
						name: "消费去向",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: []
					}]
				},
				ringoption_get: {
					title: {
						text: "过去30日收入来源",
						subtext: "",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						x: "left",
						data: ["工资", "股票", "兼职"]
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: false
							},
							dataView: {
								show: false,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ["pie", "funnel"],
								option: {
									funnel: {
										x: "25%",
										width: "50%",
										funnelAlign: "left",
										max: 1548
									}
								}
							},
							restore: {
								show: false
							},
							saveAsImage: {
								show: false
							}
						}
					},
					calculable: true,
					series: [{
						name: "收入来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: []
					}]
				},

				//占比配置项
				ringoption_rate: {
           title: {
            text: "过去30日消费占比",
            subtext: "支出/收入的比率",
            x: "center"
          },
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ["收入", "支出"]
					},
					calculable: true,
					series: [{
						name: '比重',
						type: 'pie',
            radius: ['40%', '60%'],
            center: ["50%", "60%"],
						itemStyle: {
							normal: {
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							emphasis: {
								label: {
									show: true,
									position: 'center',
									textStyle: {
										fontSize: '15',
										fontWeight: 'bold'
									}
								}
							}
						},
						data: [
               {value:0, name:'收入'},
               {value:0, name:'支出'},
            ]
					}]
				}
			};
		},
		created() {

			//取得数据的引用，方便调用
			let _this = this;
			this.items = myMoney;
			this.tabledata = tabledata;
			this.mmLink = mmLink;

			//过去30日消费折线图数据
			let line_data = this.$utils.getLineData(cost);
			({
				count: this.lineoption.series[0].data,
				day: this.lineoption.xAxis[0].data
			} = line_data);

			//过去30日消费圆环数据
			let ring_data_cost = this.$utils.getRingCostData(cost);
			({
				all: this.ringoption_cost.series[0].data
			} = ring_data_cost);

			//过去30日收入圆环数据
			let ring_data_get = this.$utils.getRingGetData(gets);
			({
				all: this.ringoption_get.series[0].data
			} = ring_data_get);

			//过去30日收益比率以及收支总差数据
			let cost_data = _this.tabledata.filter(
				(value, index) => value.type == "cost" || value.type == "支出"
			);
			let cost_total = 0,
				card_cost = 0,
				cash_cost = 0,
				yct_cost = 0;
			for (let i of [...cost_data]) {
				cost_total += i.count;
				switch (i.from) {
					case '银行卡':
						card_cost += i.count;
						break;

					case '现金':
						cash_cost += i.count;
						break;

					case '羊城通':
						yct_cost += i.count;
						break;
				}
			}
			_this.lineoption.title.subtext = "共消费支出" + cost_total;
			let get_data = _this.tabledata.filter(
				(value, index) => value.type == "get" || value.type == "收入"
			);
			let get_total = 0,
				card_get = 0,
				cash_get = 0,
				yct_get = 0;
			for (let i of [...get_data]) {
				get_total += i.count;
				switch (i.from) {
					case '银行卡':
						card_get += i.count;
						break;

					case '现金':
						cash_get += i.count;
						break;

					case '羊城通':
						yct_get += i.count;
						break;
				}
			}
			this.ringoption_rate.series[0].data[0].value = get_total;
			this.ringoption_rate.series[0].data[1].value = cost_total;
			if (this.mmLink.init) {
				this.mmLink['开支总差'].count = get_total - cost_total;
				this.mmLink['支出占比'].count = Math.trunc(cost_total / get_total * 100) + "%";
				this.mmLink['银行卡'].count -= card_cost;
				this.mmLink['现金'].count -= cash_cost;
				this.mmLink['羊城通'].count -= yct_cost;
				this.mmLink['银行卡'].count += card_get;
				this.mmLink['现金'].count += cash_get;
				this.mmLink['羊城通'].count += yct_get;

				this.mmLink['银行卡'].count = Math.trunc(this.mmLink['银行卡'].count);
				this.mmLink['现金'].count = Math.trunc(this.mmLink['现金'].count);
				this.mmLink['羊城通'].count = Math.trunc(this.mmLink['羊城通'].count);
				this.mmLink['总资产'].count = Math.trunc(this.mmLink['现金'].count + this.mmLink['银行卡'].count + this.mmLink['羊城通'].count);
				this.mmLink.init = false;
			}
		},
		methods: {}
	};

</script>

