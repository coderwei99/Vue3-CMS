<template>
  <div class="login-penal">
    <h2 class="title">后台管理系统</h2>
    <div>
      <el-tabs type="border-card" stretch>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-date"></i> 密码</span>
          </template>
          <login-account />
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-date"></i> 手机</span>
          </template>
          手机
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    return {}
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
}
</style>
z
