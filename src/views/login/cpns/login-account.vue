<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="state" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="state.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="state.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'

// 导入储存到localStore函数
import localCache from '@/utils/cache'

// 导入vuex的login模块
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    let state = reactive({
      name: localCache.getCache('name'),
      password: localCache.getCache('password')
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    const loginAction = (isFlag: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('执行登录操作')
          // 判断是否需要记住密码
          if (isFlag) {
            // 储存到本地
            localCache.setCache('name', state.name)
            localCache.setCache('password', state.password)
          } else {
            localCache.delete('name')
            localCache.delete('password')
          }
          // 开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...state })
        }
      })
    }
    return {
      state,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
