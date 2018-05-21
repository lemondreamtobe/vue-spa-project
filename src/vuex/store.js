import Vue from 'vue'
import Vuex from 'vuex'
import {
	MUTATION_INCREMENT,
	MUTATION_DECREMENT
} from './mutation-types.js';
Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  state: { count: 20 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}

const moduleB = {
  namespaced: true,
  state: { 
    name: 'B'
  },
  mutations: {  },
  actions: {  }
}

const store = new Vuex.Store({
	// 定义状态
	state: {
		count: 0,
		lis: [{
			name: 'leo',
			age: 24
		}, {
			name: 'geo',
			age: 24
		}, {
			name: 'lisa',
			age: 20
		}, {
			name: 'bob',
			age: 21
		}, {
			name: 'zlk',
			age: 18
		}]
	},
	mutations: {
		[MUTATION_INCREMENT](state, num) {
			state.count += num || 10
		},
		[MUTATION_DECREMENT](state, num) {
			state.count -= num || 10
		}
	},
	getters: {
		doneTodos: state => {
			return state.lis.filter(man => man.age > 20)
		}
	},
	actions: {
		increment({
			commit
		}) {
			setTimeout(() => {
				commit('increment')
			}, 1000)
		}
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})

export default store
