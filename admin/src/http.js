import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://111.231.58.128:3200/admin/api'
  // baseURL: 'http://127.0.0.1:3200/admin/api'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers['Authorization'] = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message.error(err.response.data.message)
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default http
