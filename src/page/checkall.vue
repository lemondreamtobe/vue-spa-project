<template>
	<div class="checkall">
		<div class="check-form">
			<el-form status-icon :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
				<el-form-item label="金额" prop="count">
					<el-input v-model="formInline.count" placeholder="金额"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="formInline.type" placeholder="交易类型">
						<el-option label="所有类型" value="所有类型"></el-option>
						<el-option label="收入" value="收入"></el-option>
						<el-option label="支出" value="支出"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="交易时间" required>
					<el-form-item prop="begindate">
						<el-date-picker type="date" placeholder="开始时间" v-model="formInline.begindate" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
				<el-form-item label="" required>
					<el-form-item prop="enddate">
						<el-date-picker type="date" placeholder="结束时间" v-model="formInline.enddate" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
				<!-- <el-form-item>			 -->
						<el-button type="primary" @click="submitForm('formInline')">查询</el-button>
				<!-- </el-form-item> -->
			</el-form>
		</div>
		<div class="check-table">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="date" label="日期">
				</el-table-column>
				<el-table-column prop="count" label="金额/¥">
				</el-table-column>
				<el-table-column prop="way" label="去向/来源">
				</el-table-column>
				<el-table-column prop="type" label="类型">
				</el-table-column>
				<el-table-column prop="desc" label="描述">
				</el-table-column>
			</el-table>
		</div>
		<div class="check-pagnation">
			<el-pagination :total="pagination.total" :page-size="20" background layout="prev, pager, next">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import { tabledata } from "../const/table.js";
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
      tabledata: [],
      formInline: {
        count: "",
        type: "",
        enddate: "",
        begindate: ""
      },
      rules: {
        count: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          },
          {
            validator: checkAge,
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择交易类型",
            trigger: "change"
          }
        ],
        begindate: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        enddate: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      },

      //table
      tableData: [],
      pagination: {
        pageSize: 15,
        total: 0
      }
    };
  },
  created() {
    let _this = this;
    _this.tableData = tabledata;
    for (let i of tabledata) {
      switch (i.type) {
        case "cost":
          i.type = "支出";
          break;
        case "get":
          i.type = "收入";
          break;
      }
    }
    _this.pagination.total = _this.tableData.length;
    // this.tableData = table_data;
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.formInline.type == "all") {
            return;
          } else {
            _this.tableData = _this.tableData.filter((value, index) => {
              return value.type == _this.formInline.type;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

