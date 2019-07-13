// 导入axios模块
import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // headers
})
// 请求拦截,发出请求前,触发
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('te')
  if (user) {
    config.headers = {
      // key : value;
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
// 导出信息
export default instance
