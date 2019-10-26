import axios from 'axios'

const http = axios.create({
  baseURL: 'http://192.168.0.138:3000/admin/api'
})

export default http
