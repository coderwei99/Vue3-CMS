<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import loginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: {
    loginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  background-image: url('../../assets/img/login-bg.svg');
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
