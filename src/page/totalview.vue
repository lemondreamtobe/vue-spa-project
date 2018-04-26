<template>
	<div class="left-bottom">
		<h3 class="index-title">布局</h3>
		<div class="personal-info">
			<el-row>
				<el-col :span="4" v-for="item in items" :key="item.id">
					<div class="butstyle">
						<div>
							{{item.type}}
						</div>
						<div>
							{{item.count}}
						</div>
						<div>
							{{item.icon}}
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<h3 class="index-title">表格</h3>
		<div class="person-echart">

			<chart :auto-resize="resize" style="width: 100%;height: 400px;position: absolute;top: 10%;" :options="option" :theme="macarons"></chart>
		</div>
		<div class="person-echart">
			<el-row>
				<el-col :span="8">
					<chart :auto-resize="resize" style="width: 100%;height: 335px;position: absolute;top: 10%;" :options="option2" :theme="macarons"></chart>
				</el-col>
				<el-col :span="8">
				</el-col>
				<el-col :span="8">
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
    import Vue from 'vue'
	import ECharts from 'vue-echarts/components/ECharts.vue'
	import 'echarts/lib/chart/line'
	import 'echarts/lib/component/tooltip'
	require('echarts/theme/macarons');
	Vue.component('chart', ECharts)
	export default {
		data() {
			return {
				items: [{
					type: 1,
					count: 2,
					icon: 3,
				}, {
					type: 1,
					count: 2,
					icon: 3,
				}, {
					type: 1,
					count: 2,
					icon: 3,
				}, {
					type: 1,
					count: 2,
					icon: 3,
				}, {
					type: 1,
					count: 2,
					icon: 3,
				}, {
					type: 1,
					count: 2,
					icon: 3,
				}],
				resize: true,
				macarons: 'macarons',
				option: {
					title: {
						text: '未来一周气温变化',
						subtext: '纯属虚构'
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						top: '20%'
					},
					legend: {
						data: ['最高气温', '最低气温']
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						}
					}],
					series: [{
							name: '最高气温',
							type: 'line',
							data: [11, 11, 15, 13, 12, 13, 10],
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
								]
							},
							markLine: {
								data: [{
									type: 'average',
									name: '平均值'
								}]
							}
						},

					]
				},
				option2: {
					title: {
						text: '某站点用户访问来源',
						subtext: '纯属虚构',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
								type: ['pie', 'funnel'],
								option: {
									funnel: {
										x: '25%',
										width: '50%',
										funnelAlign: 'left',
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
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [{
								value: 335,
								name: '直接访问'
							},
							{
								value: 310,
								name: '邮件营销'
							},
							{
								value: 234,
								name: '联盟广告'
							},
							{
								value: 135,
								name: '视频广告'
							},
							{
								value: 1548,
								name: '搜索引擎'
							}
						]
					}]
				}
			}
		},
		created() {
			let _self = this;
			this.$http.get("/api/name").then(response => {
				response = response.body;
				if (response.errno === 0) {
					console.log(response.data);
				}
			});
			setTimeout(function () {
				_self.show = true;
			}, 500);
		},
		methods: {
			shuffle: function () {
				this.list = _.shuffle(this.list);
			}
		}
	};

</script>

