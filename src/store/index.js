import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: {
      database: '',
      address: '',
    },
  },
  mutations: {
    initConnection(state, conn) {
      state.connection = conn
    },
  },
  getters: {
    address: state => {
      return state.connection.address
    },
    database: state => {
      return state.connection.database
    },
  },
  actions: {},
  modules: {},
})
