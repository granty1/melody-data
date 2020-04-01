import Vue from 'vue'
import Vuex from 'vuex'
import { updateTime } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: {
      database: '',
      address: '',
      websocket: '',
      connect: false,
      timeControl: {},
    },
  },
  mutations: {
    initConnection(state, conn) {
      state.connection = conn
      Vue.ls.set('connection', conn)
    },
    updateConnect(state, connect) {
      state.connection.connect = connect
      Vue.ls.set('connection', state.connection)
    },
    updateTimeControl(state, data) {
      state.connection.timeControl = data
      Vue.ls.set('connection', state.connection)
      updateTime(data)
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
    timecontrol: state => {
      return state.connection.timeControl
    },
  },
  actions: {},
  modules: {},
})
