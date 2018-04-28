<template>
	<div class="checkall">
		<div class="check-form">
			<el-form status-icon :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
				<el-form-item label="金额" prop="count">
					<el-input v-model="formInline.count" placeholder="金额"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="formInline.type" placeholder="交易类型">
						<el-option label="收入" value="get"></el-option>
						<el-option label="支出" value="cost"></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="交易时间" prop="date">
					<el-col :span="24">
						<el-date-picker type="date" placeholder="选择日期" v-model="formInline.date" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item> -->
				<el-form-item label="交易时间" required>
					<el-col :span="12">
						<el-form-item prop="begindate">
							<el-date-picker type="date" placeholder="开始时间" v-model="formInline.begindate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<!-- <el-col class="line" :span="2">-</el-col> -->
					<el-col :span="12">
						<el-form-item prop="enddate">
							<el-date-picker type="date" placeholder="结束时间" v-model="formInline.enddate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('formInline')">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="check-table">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="date" label="日期">
				</el-table-column>
				<el-table-column prop="count" label="金额">
				</el-table-column>
				<el-table-column prop="type" label="类型">
				</el-table-column>
				<el-table-column prop="desc" label="描述">
				</el-table-column>
			</el-table>
		</div>
		<div class="check-pagnation">
			<el-pagination background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("收入金额不能为空"));
				}
				setTimeout(() => {
					if (!this.$utils.isNumber(value)) {
						callback(new Error("请输入数字值"));
					} else {
						if (value < 0) {
							callback(new Error("必须大于0"));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			return {
				formInline: {
					count: '',
					type: '',
                    enddate: '',
                    begindate: '',
				},
				rules: {
					count: [{
							required: true,
							message: "请输入金额",
							trigger: "blur"
						},
						{
							validator: checkAge,
							trigger: "blur"
						}
					],
					type: [{
						required: true,
						message: '请选择交易类型',
						trigger: 'change'
					}],
					begindate: [{
						type: 'date',
						required: true,
						message: '请选择开始时间',
						trigger: 'change'
                    }],
                    begindate: [{
						type: 'date',
						required: true,
						message: '请选择结束时间',
						trigger: 'change'
					}]
				},
				tableData: [{
					date: '2016-04-02',
					count: 20,
					type: '支出',
					desc: '买早餐'
				}, {
					date: '2016-04-02',
					count: 2,
					type: '支出',
					desc: '地铁上班'
				}, {
					date: '2016-04-03',
					count: 35,
					type: '支出',
					desc: '中午吃饭'
				}, {
					date: '2016-04-21',
					count: 200,
					type: '支出',
					desc: '煤气'
				}]
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						alert("submit!");
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}

</script>

