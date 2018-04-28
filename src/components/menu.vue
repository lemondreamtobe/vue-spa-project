<template>
	<el-menu :router="rt" default-active="/index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#F56C6C"
	    text-color="#fff" active-text-color="#ffd04b">
		<!-- <el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>导航一</span>
			</template>
			<el-menu-item-group>
				<template slot="title">分组一</template>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<template slot="title">选项4</template>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu> -->
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
				rt: true,
				url:['', 'addget', 'addcost', 'checkAll']
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}

</script>
