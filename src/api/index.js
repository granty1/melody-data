import { axios } from '@/util/request'
import store from '@/store'

export function ping(data) {
  return axios({
    url: 'http://' + data.address + '/ping',
    method: 'post',
    data,
  })
}

export function query(data) {
  return axios({
    url: store.getters.address + '/query',
    method: 'post',
    data,
  })
}
