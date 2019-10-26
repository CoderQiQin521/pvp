import axios from 'axios';

const http = axios.create({
  baseUrl: 'http://localhost:3000'
})

export default http