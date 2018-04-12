<template>
	<div id="firstlogin">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名称" prop="username">
				<el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input type="password" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.password"></el-input>
			</el-form-item>
			<el-form-item prop="code" id="login-code">
				<el-row :span="24">
					<el-col :span="18">
						<el-input @keyup.enter.native="submitForm('ruleForm')" :maxlength="code.len" v-model="ruleForm.code" auto-complete="off"
						    placeholder="请输入验证码"></el-input>
					</el-col>
					<el-col :span="5">
						<div class="login-code">
							<span @click="refreshCode">{{code.value}}</span>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
			<!-- <el-form-item> -->
			<el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
			<!-- </el-form-item> -->
		</el-form>
	</div>
</template>
<script>
	import util from "../utils/index.js";
	import {
		USER
	} from '../const/login.js';
	const {
		USERNAME: username,
		PASSWORD: password
	} = USER;
	export default {
		data() {
			const validateCode = (rule, value, callback) => {
				if (this.code.value != value) {
					this.ruleForm.code = "";
					this.refreshCode();
					callback(new Error("请输入正确的验证码"));
				} else {
					callback();
				}
			};
			const validateName = (rule, value, callback) => {
				if (value != username) {
					callback(new Error("请输入正确的用户名"));
				} else {
					callback();
				}
			};
			const validatePw = (rule, value, callback) => {
				if (value != password) {
					callback(new Error("请输入正确的密码"));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					code: "",
				},
				code: {
					src: "",
					value: "",
					len: 4,
					type: "text"
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						},
						{
							required: true,
							trigger: "blur",
							validator: validateName
						},
					],
					password: [{
							required: true,
							message: '请选择用户密码',
							trigger: 'blur'
						},
						{
							required: true,
							trigger: "blur",
							validator: validatePw
						},
					],
					code: [{
							required: true,
							message: "请输入验证码",
							trigger: "blur"
						},
						{
							min: 4,
							max: 4,
							message: "验证码长度为4位",
							trigger: "blur"
						},
						{
							required: true,
							trigger: "blur",
							validator: validateCode
						}
					]
				}
			};
		},
		created() {
			this.refreshCode();
			this.ruleForm.username = '';
			this.ruleForm.password = '';
		},
		methods: {
			checkUser({
				key = 'username',
				value = ''
			} = {}) {

				let text = (key === 'username' ? '用户名不存在' : '密码错误');
				this.ruleForm[key] = '';
				this.$message.error(text);
				this.submitForm('ruleForm');
				return;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {

					if (valid) {
						this.$router.push({
							path: 'index'
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			refreshCode() {
				this.ruleForm.code = "";
				this.code.value = util.getRandom(4).join('');
			},
		}
	}

</script>

