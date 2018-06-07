<template>
	<el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
		<el-form-item prop="phone">
			<el-input @keyup.enter.native="handleLogin" v-model="loginForm.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
		</el-form-item>
		<el-row>
			<el-col :span="18">
				<el-form-item prop="code">
					<el-input @keyup.enter.native="handleLogin" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">

					</el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<span @click="handleSend" class="msg-text yzm" :class="[{display:msgKey}]">{{msgText}}</span>
			</el-col>
		</el-row>
		<!-- <el-form-item> -->
			<el-button class="login-btn" type="primary" @click.native.prevent="handleLogin">预览</el-button>
		<!-- </el-form-item> -->
	</el-form>
</template>

<script>
	const MSGINIT = "发送验证码",
		MSGERROR = "验证码发送失败",
		MSGSCUCCESS = "${time}秒后重发",
		MSGTIME = 60;
	import util from "../utils/index.js";

	export default {
		name: "codelogin",
		data() {
			const validatePhone = (rule, value, callback) => {

				if (value && util.isvalidatemobile(value)[0]) {
					callback(new Error(util.isvalidatemobile(value)[1]));
				} else {
					callback();
				}
			};
			const validateCode = (rule, value, callback) => {

				if (value && value.length != 4 && value != this.phone_code) {
					callback(new Error("请输入正确的4位数的验证码"));
				} else {
					callback();
				}
			};
			return {
				msgText: MSGINIT,
				msgTime: MSGTIME,
				msgKey: false,
				phone_code: '',
				loginForm: {
					phone: "15602295841",
					code: ""
				},
				loginRules: {
					phone: [
						{
							required: true,
							message: "请填写手机号码",
							trigger: "blur"
						},
						{
							required: true,
							trigger: "blur",
							validator: validatePhone
						}
					],
					code: [
						{
							required: true,
							message: "请填写验证码",
							trigger: "blur"
						},
						{
							required: true,
							trigger: "blur",
							validator: validateCode
						},
					]
				}
			};
		},
		created() {},
		mounted() {},
		computed: {
			
		},
		props: [],
		methods: {
			handleSend() {
				if (this.msgKey) return;
				this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
				this.msgKey = true;
				this.phone_code = util.getRandom(4).join("");
				this.$message({
					message: '验证码发送成功!4位验证码是: ' + this.phone_code,
					type: 'success'
				});
				const time = setInterval(() => {
					this.msgTime--;
					this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
					if (this.msgTime == 0) {
						this.msgTime = MSGTIME;
						this.msgText = MSGINIT;
						this.msgKey = false;
						clearInterval(time);
					}
				}, 1000);
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {

					if (valid) {
                        this.$utils.setLogin(this.loginForm);
                        this.$router.push({ path: 'index'});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	};

</script>

