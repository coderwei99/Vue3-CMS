class localCache {
  // 设置某个localStorage
  setCache(key: string, value: any) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取某个localStorage
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 删除某个localStorage
  delete(key: string) {
    window.localStorage.removeItem(key)
  }

  // 删除全部localStorage
  clear() {
    window.localStorage.clear
  }
}

export default new localCache()
