import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login'
import Content from '@/page/content'
import TotalView from '@/page/totalview'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: Login
		}, {
			path: '/index',
      component: Index,
      children: [
        {
          path: '',
          component: TotalView,
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

