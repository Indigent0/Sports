import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catchArr: [ 'CreateGame' ]
  },
  mutations: {
    iskeepAlive(state, component) {
			!state.catchArr.includes(component) && state.catchArr.push(component);
		},
		nokeepAlive(state, component) {
			let index = state.catchArr.indexOf(component);
			index > -1 && state.catchArr.splice(index, 1);
		},
  },
  actions: {
  },
  modules: {
  }
})
