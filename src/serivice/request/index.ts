import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// 导入elemeplus 的load加载动画
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus'

const DEAFULT_LOADING = true
// 定义一个接口，允许传入四个拦截器，并且写成可选参数，可传可不传，毕竟不是每个请求需要用刀四个拦截器的。
interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 定义一个接口，继承自 AxiosRequestConfig，因为我们需要 AxiosRequestConfig提供的属性，又需要添加自己写的属性，所以继承以后，后续就不用AxiosRequestConfig，用自己定义的接口 HYRequestConfig。
interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 给所有实例添加拦截器：全局拦截器，因为定义在constructor中，所以类在每次实例化的时候都会自动定义全局拦截器
    // 全局拦截器先执行，实例拦截器后执行
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局拦截器：请求成功拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在起飞...',
            background: 'reba(0,0,0,.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('全局拦截器：请求失败拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局拦截器：响应成功拦截器')

        // 移除loading
        this.loading?.close()
        return res.data
      },
      (err) => {
        console.log('全局拦截器：请求失败拦截器')
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        // 将showloading设置为false，不加载动画，在请求结束设置为true
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 请求结束将load设置为true，默认加载动画
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
