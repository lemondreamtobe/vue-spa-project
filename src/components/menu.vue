<template>
	<el-menu :router="rt" :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#F56C6C"
	    text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/index" v-on:click="selectHandle('/index')">
			<i class="el-icon-view"></i>
			<span slot="title">消费总览</span>
		</el-menu-item>
		<el-menu-item index="/index/addget" v-on:click="selectHandle('/index/addget')">
			<i class="el-icon-menu"></i>
			<span slot="title">新增收入</span>
		</el-menu-item>
		<el-menu-item index="/index/addcost" v-on:click="selectHandle('/index/addcost')">
			<i class="el-icon-document"></i>
			<span slot="title">新增支出</span>
		</el-menu-item>
		<el-menu-item index="/index/checkAll" v-on:click="selectHandle('/index/checkAll')">
			<i class="el-icon-setting"></i>
			<span slot="title">明细查询</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	import{active} from "../const/menu.js";
	export default {
		data() {
			return {
				active: '',
				rt: true,
				url:['', 'addget', 'addcost', 'checkAll']
			}
		},
		created() {
			this.active = active.path.url;
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			selectHandle(path) {
				this.active = path;
				active.path.url = path;
			}
		}
	}

</script>
