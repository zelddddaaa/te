// 导入axios模块
import axios from 'axios'
// 导入JSONBig,处理最大安全值
import JSONBig from 'json-bigint'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // headers
  // 自定义最大安全值转换方式,`transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})
// 请求拦截,发出请求前,触发
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const user = window.sessionStorage.getItem('te')
  if (user) {
    config.headers = {
      // key : value;
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 处理请求错误
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
// 导出信息
export default instance
