import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'

import login from './login/login'
const store = createStore<IRootState>({
  state: {
    name: 'dw',
    age: 1321
  },
  mutations: {},
  actions: {},
  modules: { login }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
