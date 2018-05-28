import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login'
import Content from '@/page/content'
import TotalView from '@/page/totalview'
import AddGet from '@/page/addget'
import AddCost from '@/page/addcost'
import CheckAll from '@/page/checkall'
import Test from '@/page/test'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Login
			// component: Test
		},
		{
			path: '/test',
			component: Test
		},
		{
			path: '/index',
			component: Index,
			children: [{
					path: '',
					component: TotalView,
				},
				{
					path: 'addget',
					component: AddGet,
				},
				{
					path: 'addcost',
					component: AddCost,
				},
				{
					path: 'checkall',
					component: CheckAll,
				}
			]
		},
		{
			path: '/content/:id',
			component: Content
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

