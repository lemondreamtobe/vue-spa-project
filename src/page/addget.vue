<template>
	<div class="addget">
		<div class="addget-form-title">
			新增收入表单
		</div>
		<div class="addget-form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="收入金额" prop="get_count">
					<el-input v-model.number="ruleForm.get_count"></el-input>
				</el-form-item>
				<el-form-item label="收入来源" prop="get_form">
					<el-select v-model="ruleForm.get_form" placeholder="请选择收入来源">
						<el-option label="工资" value="工资"></el-option>
						<el-option label="股票" value="股票"></el-option>
						<el-option label="兼职" value="兼职"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收入时间" required>
					<!-- <el-col :span="24"> -->
					<el-form-item prop="get_time">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.get_time" style="width: 100%;"></el-date-picker>
					</el-form-item>
					<!-- </el-col> -->
				</el-form-item>
				<el-form-item label="是否存档" prop="get_delivery">
					<el-switch v-model="ruleForm.get_delivery"></el-switch>
				</el-form-item>
				<el-form-item label="收入形式" prop="get_type">
					<el-radio-group v-model="ruleForm.get_type">
						<el-radio label="现金"></el-radio>
						<el-radio label="银行卡"></el-radio>
						<el-radio label="羊城通"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="收入描述" prop="get_desc">
					<el-input type="textarea" v-model="ruleForm.get_desc"></el-input>
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
	export default {
		data() {
			return {
        mmLink: {},
				ruleForm: {
					get_count: "",
					get_form: "",
					get_time: "",
					get_delivery: false,
					get_type: "",
					get_desc: ""
				},
				rules: {
					get_count: [{
							required: true,
							message: "请输入收入金额",
							trigger: "blur"
						},
						{
							type: "number",
							message: "请输入数字值",
							trigger: "blur"
						}
					],
					get_form: [{
						required: true,
						message: "请选择收入来源",
						trigger: "change"
					}],
					get_time: [{
						type: "date",
						required: true,
						message: "请选择收入日期",
						trigger: "change"
					}],
					get_type: [{
						required: true,
						message: "请至少选择一个收入形式",
						trigger: "change"
					}],
					get_desc: [{
						required: true,
						message: "请简要描述此次收入",
						trigger: "blur"
					}]
				}
			};
		},
		created() {

			if (!this.$utils.checkLogin()) {
				this.$message({
					message: '请重新进行登录认证',
					type: 'warning'
				 });
				 this.$router.push({ path: '/' });
			};
			let _this = this;
      		_this.mmLink = mmLink;
		},
		methods: {
			submitForm(formName) {
				let _this = this;
				_this.$refs[formName].validate(valid => {
					if (valid) {
						_this.$notify({
							title: "成功",
							message: "新增成功",
							type: "success"
						});
						tabledata.push({
							date: _this.ruleForm.get_time.toLocaleDateString(),
							type: "get",
							way: _this.ruleForm.get_from,
							desc: _this.ruleForm.get_desc,
							count: _this.ruleForm.get_count,
              from: _this.ruleForm.get_type
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
				_this.$refs[formName].resetFields();
			}
		}
	};

</script>

