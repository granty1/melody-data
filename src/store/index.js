import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: {
      database: '',
      address: '',
      websocket: '',
      connect: false,
    },
  },
  mutations: {
    initConnection(state, conn) {
      state.connection = conn
      Vue.ls.set('connection', state.connection)
    },
    updateConnect(state, connect) {
      state.connection.connect = connect
      Vue.ls.set('connection', state.connection)
    },
  },
  getters: {
    address: state => {
      return state.connection.address
    },
    database: state => {
      return state.connection.database
    },
    websocket: state => {
      return state.connection.websocket
    },
    connect: state => {
      return state.connection.connect
    },
  },
  actions: {},
  modules: {},
})
