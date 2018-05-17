<template>
	<div class="checkall">
		<div class="check-form">
			<el-form status-icon :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
				<el-form-item label="目标" prop="from">
					<el-select v-model="formInline.from" placeholder="收支目标">
            <el-option label="所有类型" value="所有类型"></el-option>
						<el-option label="银行卡" value="银行卡"></el-option>
						<el-option label="现金" value="现金"></el-option>
						<el-option label="羊城通" value="羊城通"></el-option>
					</el-select>
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
        <el-table-column prop="from" label="收支目标">
				</el-table-column>
				<el-table-column prop="desc" label="描述">
				</el-table-column>
			</el-table>
		</div>
		<div class="check-pagnation">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current" :total="pagination.total" :page-size="pagination.pageSize" background layout="total, prev, pager, next">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import { tabledata } from "../const/table.js";
export default {
  data() {
    return {
      formInline: {
        from: "",
        type: "",
        enddate: "",
        begindate: ""
      },
      rules: {
        from: [
          {
            required: true,
            message: "请选择收支目标",
            trigger: "blur"
          },
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
      tableData_mid: [],
      pagination: {
        pageSize: 10,
        total: 0,
        current: 1
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

    //初始表格数据
    _this.tableData_mid = tabledata.concat();
    _this.tableData = _this.tableData_mid.concat().splice(0, 10);
    for (let i of _this.tableData_mid) {
      switch (i.type) {
        case "cost":
          i.type = "支出";
          break;
        case "get":
          i.type = "收入";
          break;
      }
    }
    _this.pagination.total = _this.tableData_mid.length;
  },
  mounted() {},
  methods: {
    handleCurrentChange(a, b) {
      this.tableData = this.tableData_mid.concat().splice((a - 1) * this.pagination.pageSize, this.pagination.pageSize);
      $(".check-form")[0].scrollIntoView();
    },
    freshTableData(mark, aim) {
      let _this = this;
      switch(mark) {
        case '所有类型':
           _this.tableData_mid = tabledata.concat();
           break;
        default:
          _this.tableData_mid = tabledata.filter((value, index) => {
            return value.type == _this.formInline.type;
          });
      }
      switch(aim) {
        case '所有类型':
           _this.tableData_mid = _this.tableData_mid;
           break;
        default:
          _this.tableData_mid = _this.tableData_mid.filter((value, index) => {
            return value.from == _this.formInline.from;
          });
          break;
      }
      _this.tableData_mid = _this.tableData_mid.filter((value, index) => {
          return _this.formInline.begindate.getTime() <= new Date(value.date).getTime() && new Date(value.date).getTime() <= _this.formInline.enddate.getTime()
      });
      _this.tableData = _this.tableData_mid.concat().splice(0, 10);
      _this.pagination.current = 1;
      _this.pagination.total = _this.tableData_mid.length;
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.freshTableData(this.formInline.type, this.formInline.from);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

