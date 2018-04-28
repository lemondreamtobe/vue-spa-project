<template>
	<div class="addget">
		<div class="addget-form-title">
			新增收入表单
		</div>
		<div class="addget-form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="收入金额" prop="get_count">
					<el-input v-model="ruleForm.get_count"></el-input>
				</el-form-item>
				<el-form-item label="收入来源" prop="get_form">
					<el-select v-model="ruleForm.get_form" placeholder="请选择收入来源">
						<el-option label="工资" value="gongzi"></el-option>
						<el-option label="股票" value="gupiao"></el-option>
            <el-option label="兼职" value="jianzhi"></el-option>
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
                        <el-radio label="支付宝"></el-radio>
						<el-radio label="微信钱包"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="收入描述" prop="get_desc">
					<el-input  type="textarea" v-model="ruleForm.get_desc"></el-input>
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
      ruleForm: {
        get_count: "",
        get_form: "",
        get_time: "",
        get_delivery: false,
        get_type: "",
        get_desc: ""
      },
      rules: {
        get_count: [
          { required: true, message: "请输入收入金额", trigger: "blur" },
          { validator: checkAge, trigger: "blur" }
        ],
        get_form: [
          { required: true, message: "请选择收入来源", trigger: "change" }
        ],
        get_time: [
          {
            type: "date",
            required: true,
            message: "请选择收入日期",
            trigger: "change"
          }
        ],
        get_type: [
          {
            required: true,
            message: "请至少选择一个收入形式",
            trigger: "change"
          }
        ],
        get_desc: [
          { required: true, message: "请简要描述此次收入", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let type = this.$router.currentRoute.fullPath.split("/");
    let url = type[type.length - 1];
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
};
</script>

