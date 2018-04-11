import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login'
import Content from '@/page/content'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Login
  },{
    path: '/index',
    component: Index
  },
  {
    path: '/content/:id',
    component: Content
  }],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
