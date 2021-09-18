<template>
  <div class="main">
    <el-container class="page">
      <el-aside width="210px" class="page-aside">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <el-header class="page-header">Header</el-header>
        <el-main class="page-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavMenu from '@/components/nav-menu/src/nav-menu.vue'
export default defineComponent({
  components: {
    NavMenu
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.page {
  height: 100%;

  .page-aside {
  }
  .page-header {
    background: red;
  }
  .page-content {
    background: blue;
  }
}
</style>
