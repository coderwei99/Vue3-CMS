<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import 'element-plus/theme-chalk/el-button.css'

export default defineComponent({
  components: {},
  name: 'App'
})
</script>
<style lang="less">
#nav {
  height: 100%;
}
</style>
