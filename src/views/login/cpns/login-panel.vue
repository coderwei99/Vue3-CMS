<template>
  <div class="login-penal">
    <h2 class="title">后台管理系统</h2>
    <div>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 密码</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机</span>
          </template>
          <login-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="remember-password">
      <el-checkbox v-model="isFlag">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" size="medium" class="login-in" @click="login_in"
      >起飞</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

// 导入账号密码登录组件
import LoginAccount from './login-account.vue'
// 导入手机号登录组件
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },

  setup() {
    let isFlag = ref(false)
    let accountRef = ref<InstanceType<typeof LoginAccount>>()
    let phoneRef = ref<InstanceType<typeof LoginPhone>>()
    let currentTab = ref('account')
    // 登录按钮
    const login_in = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isFlag.value)
      } else {
        // phoneRef.value?.loginAction()
        console.log('手机登录', phoneRef)
      }
    }
    return {
      isFlag,
      login_in,
      accountRef,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-penal {
  margin-bottom: 180px;
  width: 320px;

  .title {
    text-align: center;
    padding-bottom: 20px;
  }

  .remember-password {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
  }

  .login-in {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
z
