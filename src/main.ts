import { createApp } from 'vue'
import App from './App.vue'

// 引入样式重置的第三方库：normalize
import 'normalize.css'

// 引入自己写的全局样式
import './assets/css/base.css'

import router from './router'
import store from './store'

// import { registerApp } from './global'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import './serivice/index'
// import hyRequest from './serivice/index'
const app = createApp(App)
// registerApp(app)

app.use(store).use(router).use(ElementPlus).mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的拦截器')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的拦截器')
//         return res
//       }
//     },
//     // 默认出现动画框，不需要出现动画框改为false即可
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
