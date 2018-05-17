import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import Vuex from 'vuex'
import store from './vuex/store'
// import './assets/js/bootstrap.min'
// 引用API文件
import api from './api/index.js'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// 将API方法绑定到全局
Vue.prototype.$api = api

import utils from './utils/index.js'
Vue.prototype.$utils = utils

Vue.config.productionTip = false
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(ElementUI);
Vue.use(Vuex)

//全局注册通用组件
const requireComponent = require.context(
	// 其组件目录的相对路径
	'./components',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 剥去文件名开头的 `'./` 和结尾的扩展名
			fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
		)
	)

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
//
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	}
})

