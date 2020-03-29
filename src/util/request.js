import axios from 'axios'
import { VueAxios } from './axios'
import { Notice, Spin } from 'view-design'

// 创建 axios 实例
const service = axios.create({
  timeout: 6000, // 请求超时时间
})

const err = error => {
  Spin.hide()
  Notice.warning({
    duration: 1.5,
    desc: '无法连接到目的服务:' + error,
  })
}

// request interceptor
service.interceptors.request.use(req => {
  Spin.show()
  return req
}, err)

// response interceptor
service.interceptors.response.use(res => {
  Spin.hide()
  return res.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  },
}

export { installer as VueAxios, service as axios }
