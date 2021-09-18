import { Module } from 'vuex'

// 导入类型
import { ILoginState } from './types'
import { IRootState } from '../type'

// 导入封装的网络请求函数
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/serivice/login/login'

// 导入store辅助函数
import localCache from '@/utils/cache'

// 导入touter
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveUserInfo(state, Info: any) {
      state.userInfo = Info
    },
    saveUserMenus(state, menus: any) {
      // state.userMenus = menus
      state.userMenus = menus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      // 登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('saveToken', token)
      localCache.setCache('token', token)

      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      commit('saveUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)

      // 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(
        userInfoResult.data.role.id
      )
      const userMenus = userMenusResult.data
      console.log('11', userMenus)
      commit('saveUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },

    phoneLoginAction({ commit }, payload: any) {
      console.log(commit, payload)
    },

    // 初始化vuex的数据。如果用户刷新，vuex的数据会丢失，因为vuex的数据存放在内存中，浏览器刷新后内存会释放，如果用户在登录的情况下，刷新了界面，localStore中有对应的用户数据，但是vuex中没有对应的数据，这个时候如果我们继续在组件中拿vuex的数据，界面就会报错
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      // 如果store中有数据，才储存到vuex中
      if (token) {
        commit('saveToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      // 如果store中有数据，才储存到vuex中
      if (userInfo) {
        commit('saveUserInfo', userInfo)
      }
      const saveUserMenus = localCache.getCache('userMenus')
      // 如果store中有数据，才储存到vuex中
      if (saveUserMenus) {
        commit('saveUserMenus', saveUserMenus)
      }
    }
  }
}
export default loginModule
