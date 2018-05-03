<template>
	<div class="addget addcost">
		<div class="addget-form-title">
			新增支出表单
		</div>
		<div class="addget-form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="支出金额" prop="cost_count">
					<el-input v-model.number="ruleForm.cost_count"></el-input>
				</el-form-item>
				<el-form-item label="支出去向" prop="cost_from">
					<el-select v-model="ruleForm.cost_from" placeholder="请选择支出去向">
						<el-option label="食物" value="食物"></el-option>
						<el-option label="交通出行" value="交通出行"></el-option>
						<el-option label="话费" value="话费"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支出时间" required>
					<!-- <el-col :span="24"> -->
					<el-form-item prop="cost_time">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.cost_time" style="width: 100%;"></el-date-picker>
					</el-form-item>
					<!-- </el-col> -->
				</el-form-item>
				<el-form-item label="是否存档" prop="cost_delivery">
					<el-switch v-model="ruleForm.cost_delivery"></el-switch>
				</el-form-item>
				<el-form-item label="支出形式" prop="cost_type">
					<el-radio-group v-model="ruleForm.cost_type">
						<el-radio label="现金"></el-radio>
						<el-radio label="银行卡"></el-radio>
						<el-radio label="羊城通"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="支出描述" prop="cost_desc">
					<el-input type="textarea" v-model="ruleForm.cost_desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即新增</el-button>
					<el-button @click="resetForm('ruleForm')">重置表单</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {
		tabledata
	} from "../const/table.js";
	import {
		mmLink
	} from "../const/myMoney.js";
	import {
		cost
	} from "../const/costs";
	export default {
		data() {
			return {
				mmLink: {},
				tabledata: [],
				ruleForm: {
					cost_count: "",
					cost_from: "",
					cost_time: "",
					cost_delivery: false,
					cost_type: "",
					cost_desc: ""
				},
				rules: {
					cost_count: [{
							required: true,
							message: "请输入支出金额",
							trigger: "blur"
						},
						{
							type: "number",
							message: "请输入数字值",
              trigger: "blur"
						}
					],
					cost_from: [{
						required: true,
						message: "请选择支出去向",
						trigger: "change"
					}],
					cost_time: [{
						type: "date",
						required: true,
						message: "请选择支出日期",
						trigger: "change"
					}],
					cost_type: [{
						required: true,
						message: "请至少选择一个支出形式",
						trigger: "change"
					}],
					cost_desc: [{
						required: true,
						message: "请简要描述此次支出",
						trigger: "blur"
					}]
				}
			};
		},
		created() {
			let _this = this;
			_this.mmLink = mmLink;
			_this.tabledata = tabledata;
		},
		methods: {
			submitForm(formName) {
				let _this = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$notify({
							title: "成功",
							message: "新增成功",
							type: "success"
						});

						//更新表格数据
						_this.tabledata.push({
							date: this.ruleForm.cost_time.toLocaleDateString(),
							type: "cost",
							way: this.ruleForm.cost_from,
							desc: this.ruleForm.cost_desc,
							count: this.ruleForm.cost_count,
							from: this.ruleForm.cost_type
						});
						_this.mmLink.init = true;
						_this.resetForm("ruleForm");
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
	};

</script>

