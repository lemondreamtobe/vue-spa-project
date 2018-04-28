<template>
	<div class="left-bottom">
		<h3 class="index-title">个人资产</h3>
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
		<h3 class="index-title">收支统计</h3>
		<div class="person-echart">

			<chart :auto-resize="resize" style="width: 100%;height: 400px;position: absolute;top: 10%;" :options="lineoption" :theme="macarons"></chart>
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
		myMoney
	} from "../const/myMoney.js";
	import {
		cost
	} from "../const/costs.js";
	import {
		gets
	} from "../const/get.js";
	export default {
		data() {
			return {
				//个人资产信息
				items: [],

				//表格配置项
				resize: true,
				macarons: 'macarons',
				roma: 'shine',
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
					}],
					yAxis: [{
						type: "value",
						axisLabel: {
							formatter: "{value} ¥"
						}
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
						data: ["交通", "食物"]
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
						center: ["50%", "50%"],
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
						center: ["50%", "50%"],
						data: []
					}]
				},

				//占比配置项
				ringoption_rate: {
					legend: {
						x: 'left',
						y: 'left',
						data: [
							'消费占比',
						]
					},
					title: {
						text: '过去30日消费占比',
						subtext: '支出/收入的比率',
						x: 'center'
					},
					toolbox: {
						show: false,
					},
					series: [{
						type: 'pie',
						center: ['50%', '50%'],
						radius: [45, 85],
						x: '0%', // for funnel
						itemStyle: {
							normal: {
								label: {
									formatter: function (params) {
										return 100 - params.value + '%'
									},
									textStyle: {
										baseline: 'top'
									}
								}
							},
						},
						data: [{
								name: '收入',
								value: 46,
								itemStyle: {
									normal: {
										color: '#D43239',
										label: {
											show: true,
											position: 'center',
											formatter: '{b}',
											textStyle: {
												baseline: 'bottom'
											}
										},
										labelLine: {
											show: true
										}
									},
									emphasis: {
										color: 'rgba(0,0,0,0)'
									}
								},
							},
							{
								name: '消费占比',
								value: 54,
								itemStyle: {
									normal: {
										label: {
											show: true,
											position: 'center',
											formatter: '{b}',
											textStyle: {
												baseline: 'bottom'
											}
										},
										labelLine: {
											show: true
										}
									}
								}
							}
						]
					}]
				},
			};
		},
		created() {
			this.items = myMoney;
			let line_data = this.$utils.getLineData(cost);
			({
				count: this.lineoption.series[0].data,
				day: this.lineoption.xAxis[0].data,
			} = line_data);
			let ring_data_cost = this.$utils.getRingCostData(cost);
			({
				all: this.ringoption_cost.series[0].data,
			} = ring_data_cost);
			let ring_data_get = this.$utils.getRingGetData(gets);
			({
				all: this.ringoption_get.series[0].data,
			} = ring_data_get);
		},
		methods: {

		}
	};

</script>

