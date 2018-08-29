import axios from 'axios'
let baseURL = process.env.NODE_ENV === 'production' ? (location.origin + '/meetyou') : ''
let request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
})
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// http响应拦截器
request.interceptors.response.use(res => { // 响应成功关闭loading
  // 这儿可以对非200的错误进行拦截
  return res.data
}, error => {
  alert(error)
  return Promise.reject(error)
})
export default request
