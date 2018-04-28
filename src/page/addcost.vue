<template>
	<div class="addget addcost">
		<div class="addget-form-title">
			新增支出表单
		</div>
		<div class="addget-form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="支出金额" prop="cost_count">
					<el-input v-model="ruleForm.cost_count"></el-input>
				</el-form-item>
				<el-form-item label="支出去向" prop="cost_from">
					<el-select v-model="ruleForm.cost_from" placeholder="请选择支出去向">
						<el-option label="食物" value="food"></el-option>
						<el-option label="交通出行" value="traffic"></el-option>
                        <el-option label="其他" value="other"></el-option>
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
                        <el-radio label="支付宝"></el-radio>
						<el-radio label="微信钱包"></el-radio>
                        <el-radio label="羊城通"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="支出描述" prop="cost_desc">
					<el-input  type="textarea" v-model="ruleForm.cost_desc"></el-input>
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
        cost_count: "",
        cost_from: "",
        cost_time: "",
        cost_delivery: false,
        cost_type: "",
        cost_desc: ""
      },
      rules: {
        cost_count: [
          { required: true, message: "请输入收入金额", trigger: "blur" },
          { validator: checkAge, trigger: "blur" }
        ],
        cost_from: [
          { required: true, message: "请选择收入来源", trigger: "change" }
        ],
        cost_time: [
          {
            type: "date",
            required: true,
            message: "请选择收入日期",
            trigger: "change"
          }
        ],
        cost_type: [
          {
            required: true,
            message: "请至少选择一个收入形式",
            trigger: "change"
          }
        ],
        cost_desc: [
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
          this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          });
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

