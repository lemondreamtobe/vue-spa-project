<template>
	<el-menu :router="rt" :default-active="$router.currentRoute.fullPath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#F56C6C"
	    text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/index">
			<i class="el-icon-view"></i>
			<span slot="title">消费总览</span>
		</el-menu-item>
		<el-menu-item index="/index/addget">
			<i class="el-icon-menu"></i>
			<span slot="title">新增收入</span>
		</el-menu-item>
		<el-menu-item index="/index/addcost">
			<i class="el-icon-document"></i>
			<span slot="title">新增支出</span>
		</el-menu-item>
		<el-menu-item index="/index/checkAll">
			<i class="el-icon-setting"></i>
			<span slot="title">明细查询</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data() {
			return {
				active: '',
				rt: true,
			}
		},
		created() {
			console.log(this.$router);
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		}
	}

</script>
