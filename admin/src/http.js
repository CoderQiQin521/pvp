import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  // baseURL: 'http://111.229.27.8:3200/admin/api'
  baseURL: 'http://127.0.0.1:3000/admin/api'
})

http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message.error(err.response.data.message)
  return Promise.reject(err)
})

export default http
