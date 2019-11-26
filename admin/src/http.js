import axios from 'axios'

const http = axios.create({
  baseURL: 'http://111.229.27.8:3200/admin/api'
  // baseURL: 'http://127.0.0.1/admin/api'
})

export default http
