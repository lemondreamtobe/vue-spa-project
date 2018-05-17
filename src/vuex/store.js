import Vue from 'vue'
import Vuex from 'vuex'
import {
    MUTATION_INCREMENT,
    MUTATION_DECREMENT
} from './mutation-types.js';
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    count: 0,
    lis: [{name: 'leo', age: 24}, {name: 'geo', age: 24},{name: 'lisa', age: 20}, {name: 'bob', age: 21},{name: 'zlk', age: 18}]
  },
  mutations: {
    [MUTATION_INCREMENT](state, num) {state.count+=num || 10},
    [MUTATION_DECREMENT](state, num) {state.count-=num || 10}
  },
  getters: {
    doneTodos: state => {
      return state.lis.filter(man => man.age > 20) 
    }
  },
  actions: {
    increment ({ commit }) {
        setTimeout(() => {
            commit('increment')
          }, 1000)
    }
  }
})

export default store