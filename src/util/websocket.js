import store from '@/store'

export function NewWebSocket(url) {
  let ws = new WebSocket(store.getters.websocket + url)
  ws.onclose = () => {
    console.log(url + ' -> close websocket')
    store.commit('updateConnect', false)
  }
  ws.onopen = () => {
    console.log(url + ' -> websocket opened')
    store.commit('updateConnect', true)
  }

  return ws
}
