<template>
  <header class="header">
    <div class="logo">
      <a class="logo-img"><img src="../../static/img/logo.png"></a>
      <a class="logo-title" @click="handleCommand('exit')" title="回到登录页">开支记录后台管理系统</a>
      <!-- <a class="logo-user">用户:{{user}}</a> -->
      <el-dropdown trigger="click" class="logo-user" @command="handleCommand">
        <span class="el-dropdown-link">
          用户:{{user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  command="exit">退出登录</el-dropdown-item>
          <el-dropdown-item  command="changepw">修改密码</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :label-position="labelPosition" :rules="rules" :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item 
          disabled
          label="账号"
          prop="user"
        >
          <el-input type="user" v-model.number="form.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input type="password" v-model.number="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button  @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    </div>
  </header>
</template>
<script>
import {
		USER
  } from '../const/login.js';
export default {
  data() {
     var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (! (value == this.user)) {
          callback(new Error("不是当前登录账号"));
        } else {
           callback();
        }
      }, 100);
    };
    return {
      USER: '',
      user: "",
      nomodify: true,
      dialogVisible: false,
      labelPosition: 'left',
      form: {
        user: '',
        password: '',
      },
       rules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: checkUser, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
       }
    };
  },
  created() {
    let _this = this;
    _this.USER = USER;
    _this.user = USER.USERNAME.key;
    _this.form.user = USER.USERNAME.key;
  },
  methods: {
    handleCommand(command) {
      let  _this = this;
      if (command == 'exit') {
        this.$confirm('确认退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
             _this.$router.push({ path: '/' });
          })
          .catch(_ => {});
      } else {
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.resetForm('form');
    },
    submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '修改密码成功',
              type: 'success'
            });
             _this.USER.PASSWORD.key = _this.form.password;
            setTimeout(function() {
              _this.$router.push({ path: '/' });
            }, 500);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>
