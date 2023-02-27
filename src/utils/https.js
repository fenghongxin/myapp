import axios from 'axios'

import { ElMessage } from 'element-plus'


const HTTP = axios.create({
  baseURL: 'https://creationapi.shbwyz.com',
  timeout: 2500,
});

// /**@name 请求拦截器 */
// // 添加请求拦截器
// // axios.defaults.baseURL = 'https://creationapi.shbwyz.com/'
// HTTP.interceptors.request.use(
//   function (config) {
//     // 请求之前做些什么
//     //挂载token
//     // config.headers.authorization = Cookie.get('token')
//     // 开启加载条
//     // Nprogress.start()
//     return config
//   },
//   function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )

// // 添加响应拦截器
// HTTP.interceptors.response.use(
//   function (response) {
//     // 对响应数据做点什么
//     //关闭加载条
//     Nprogress.done()
//     //访客提示
//     if (response.data.statu === 403) {
//       ElMessage.error(response.data.msg)
//     }
//     //登录失效
//     if (response.data.statu === 401) {
//       ElMessage.error(response.data.msg)
//       Router.push('/login')
//     }
//     return response
//   },
//   function (error) {
//     // 对响应错误做点什么
//     // 响应错误时 状态码对应的问题
//     // if (error.response.data.statusCode === 400) {
//     //   return error.response.data
//     // } else {
//     //   return Promise.reject(error)
//     // }
//     return error
    
//   }
// )
// 添加请求拦截器
HTTP.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return error;
});

// 添加响应拦截器
HTTP.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return error;
});

export default HTTP